import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/libs/schemas';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as argon from 'argon2';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<User>,
    private readonly jwtService: JwtService
  ) {}

  public async signUp(res: Response, signUpDto: any) {
    try {
      const userExists = await this.UserModel.findOne({ email: signUpDto.email });

      if (userExists) {
        throw new ConflictException('Username or Email is aready taken');
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(signUpDto.password, salt);

      await this.UserModel.create({
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

  public async signIn(res: Response, signInDto: any) {
    try {
      const user = await this.UserModel.findOne({ email: signInDto.email });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isPasswordMatch = await bcrypt.compare(signInDto.password, user.password);

      if (!isPasswordMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { sub: user._id, email: user.email, role: user.role };
      const { accessToken, refreshToken } = await this.generateTokens(payload);

      const hashedAccessToken = await argon.hash(accessToken)
      const hashedRefreshToken = await argon.hash(refreshToken);

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

  public async signOut(req: Request, res: Response) {
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
        secure: false,
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000
      });

      return res.status(200).json({ content: 'token refreshed successfully' });
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
      secure: false,
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000
    });

    res.cookie('fridaymake-up-rt', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
  }
}
