import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/libs/schemas';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as argon from 'argon2';
import { SignUpDto } from 'src/libs/models/sign-up';
import { SignInDto } from 'src/libs/models/sign-in';
import { MailsService } from '../mails/mails.service';
import { EmailTemplatesEnum, EmailTokensTypes } from 'src/libs/enums';
import { AuthSession } from 'src/libs/schemas/auth-sessions.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<User>,
    @InjectModel(AuthSession.name) private readonly AuthModel: Model<AuthSession>,
    private readonly jwtService: JwtService,
    private readonly mailsSerivce: MailsService
  ) {}

  public async signUp(res: Response, signUpDto: SignUpDto) {
    try {
      
      if (signUpDto.password !== signUpDto.passwordConfirmation) {
        throw new ConflictException('Passwords are not the same');
      }

      const userExists = await this.UserModel.findOne({ email: signUpDto.email });

      if (userExists) {
        throw new ConflictException('Username or Email is already taken');
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(signUpDto.password, salt);

      await this.UserModel.create({
        firstName: signUpDto.firstName,
        lastName: signUpDto.lastName,
        username: signUpDto.username,
        email: signUpDto.email,
        password: hashedPassword
      });

      return res.status(201).json({ content: 'Account created successfully' });
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(error.message);
    }
  }

  public async signIn(res: Response, signInDto: SignInDto) {
    try {
      const user = await this.UserModel.findOne({ email: signInDto.email });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isPasswordMatch = await bcrypt.compare(signInDto.password, user.password);

      if (!isPasswordMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { sub: user._id, email: user.email, role: user.role, isEmailVerified: user.isEmailVerified };
      const { accessToken, refreshToken } = await this.generateTokens(payload);

      const hashedAccessToken = await argon.hash(accessToken)
      const hashedRefreshToken = await argon.hash(refreshToken);

      if (!user.isEmailVerified) {
        const { token } = await this.mailsSerivce.generateEmailTokens(user._id, EmailTokensTypes.VERIFY_EMAIL);
        this.mailsSerivce.sendMail(user.email, 'Fridaymake-up.com - Weryfikacja adresu email', { token: token }, EmailTemplatesEnum.EMAIL_VERIFICATION);
      }

      await user.updateOne({
        storedAccessToken: hashedAccessToken,
        storedRefreshToken: hashedRefreshToken
      });

      await user.save();

      await this.setCookies(res, accessToken, refreshToken);

      return res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      });
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(error.message);
    }
  }

  public async signOut(res: Response) {
    try {
      res.clearCookie('fridaymake-up-at');
      res.clearCookie('fridaymake-up-rt');

      return res.status(200).json({ content: 'signed-out' });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async refreshToken(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies['fridaymake-up-rt'];

      if (!refreshToken) {
        throw new UnauthorizedException('No refresh token provided');
      }

      const decoded: any = this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_JWT_SECRET,
      });
      const user = await this.UserModel.findOne({ _id: decoded.sub });

      if (!user) {
        throw new NotFoundException();
      }

      const payload = { sub: user._id, email: user.email, role: user.role };
      const accessToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRE_IN
      });

      const hashedAccessToken = await argon.hash(accessToken);
      await user.updateOne({
        storedAccessToken: hashedAccessToken,
      });

      await user.save();


      res.cookie('fridaymake-up-at', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000
      });

      return res.status(200).json({ content: 'token refreshed successfully' });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public checkValidation(res: Response) {
    return res.status(200).json({ content: true });
  }

  public async getUser(res: Response, userId: string) {
    try {
      const user = await this.UserModel.findOne({ _id: new Types.ObjectId(userId) })
        .select('username role email _id isEmailVerified');

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return res.status(200).json({ content: user });
    } catch (error) {
      
    }
  }

  public async sendEmailVerification(req: Request | any, res: Response) {

    const userEmail = req.user.email;
    const userId = req.user.sub;
    const isEmailVerified = req.user.isEmailVerified;

    if (isEmailVerified) {
      throw new ConflictException('user email is already verified');
    }

    const { token } = await this.mailsSerivce.generateEmailTokens(userId, EmailTokensTypes.VERIFY_EMAIL);
    this.mailsSerivce.sendMail(userEmail, 'Fridaymake-up.com - Weryfikacja adresu email', { token: token }, EmailTemplatesEnum.EMAIL_VERIFICATION);

    return res.status(200).json({ content: 'email send successfully' });
  }

  public async sendEmailResetPassword(res: Response, sendEmailDto: { email: string }) {
    try {
      
      const user = await this.UserModel.findOne({
        email: sendEmailDto.email
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const { token } = await this.mailsSerivce.generateEmailTokens(user?._id, EmailTokensTypes.RESET_PASSWORD);
      this.mailsSerivce.sendMail(sendEmailDto.email, 'Fridaymake-up.com - Resetowanie hasła', { token: token, email: sendEmailDto.email }, EmailTemplatesEnum.RESET_PASSWORD);

      return res.status(200).json({ content: 'email send successfully' });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async emailVerification(res: Response, token: string, email?: string) {
    try {
      const result = await this.mailsSerivce.checkTokenValidation(token);

      if (result.emailType === EmailTokensTypes.VERIFY_EMAIL) {
        return res.redirect(`${process.env.FRONTEND_URL}`);
      } 

      if (email) {
        const authSessionToken = await this.generateAuthSessionToken(email);

        return res.redirect(`${process.env.FRONTEND_URL}/auth/reset-password/${authSessionToken}`);
      }

      throw new InternalServerErrorException('Error occured while trying verify email');
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async changeUserPassword(res: Response, sessionId: string, changeUserPasswordDto: { newPassword: string }) {
    try {
      const sessionToken = await this.AuthModel.findOne({
        authSessionId: sessionId
      });

      if (!sessionToken) {
        throw new UnauthorizedException('Invalid or expired token');
      }

      if (new Date() > sessionToken.expiresAt) {
        throw new UnauthorizedException("Invalid or expired token");
      }

      const user = await this.UserModel.findOne({ _id: sessionToken.user });
      
      if (!user) {
        throw new NotFoundException('User not found');
      }

      await this.AuthModel.deleteOne({
        authSessionId: sessionId
      });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(changeUserPasswordDto.newPassword, salt);

      await user.updateOne({
        password: hashedPassword
      });
      user.save();

      return res.status(200).json({ content: 'changed' })
    } catch (error) {
      throw new InternalServerErrorException(error.message);      
    }
  }

  public async checkSessionValidation(res: Response, token: string) {
    try {
      const sessionToken = await this.AuthModel.findOne({
        authSessionId: token
      });

      if (!sessionToken) {
        throw new UnauthorizedException('Invalid or expired token');
      }

      if (new Date() > sessionToken.expiresAt) {
        throw new UnauthorizedException("Invalid or expired token");
      }

      return res.status(200).json({ content: 'valid' });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private async generateAuthSessionToken(email: string) {
    try {
      const user = await this.UserModel.findOne({
        email
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      await this.AuthModel.deleteOne({
        user: user._id
      });

      const authSessionToken = uuidv4();
      const expiresAt = new Date();

      expiresAt.setMinutes(expiresAt.getMinutes() + 15);

      await this.AuthModel.create({
        authSessionId: authSessionToken,
        expiresAt: expiresAt,
        user: user._id
      });

      return authSessionToken;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private async generateTokens(payload: any) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRE_IN
    });

    const refreshToken = await this.jwtService.signAsync({ sub: payload.sub }, {
      secret: process.env.REFRESH_JWT_SECRET,
      expiresIn: process.env.REFRESH_JWT_EXPIRE_IN
    });

    return { accessToken, refreshToken };
  }

  private async setCookies(res: Response, accessToken: string, refreshToken: string) {
    res.cookie('fridaymake-up-at', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000
    });

    res.cookie('fridaymake-up-rt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
  }
}
