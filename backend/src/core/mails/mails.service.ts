import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailTokens, User } from 'src/libs/schemas';
import { MailerService as NestMailerSerivce } from '@nestjs-modules/mailer';
import { v4 as uuidv4 } from 'uuid';
import { EmailTemplatesEnum, EmailTokensTypes } from 'src/libs/enums';

@Injectable()
export class MailsService {

  constructor(
    @InjectModel(EmailTokens.name) private readonly EmailTokens: Model<EmailTokens>,
    @InjectModel(User.name) private readonly User: Model<User>,
    private readonly mailerService: NestMailerSerivce
  ) {}

  public async sendMail(to: string, subject: string, context: { token: string, email?: string }, tempalte: EmailTemplatesEnum) {
    try {
      await this.mailerService.sendMail({
        to: to,
        from: process.env.MAILS_FROM,
        subject: subject,
        template: tempalte,
        context: { token: context.token, email: context.email }
      });

      return { content: 'email sended successfully' }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async generateEmailTokens(userId: any, emailType: EmailTokensTypes) {

    await this.EmailTokens.deleteOne({ user: userId });

    const token = uuidv4();
    const expiresAt = new Date();

    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    await this.EmailTokens.create({
      token: token,
      expiresAt: expiresAt,
      emailType: emailType,
      user: userId
    });

    return { token };
  }

  public async checkTokenValidation(token: string) {
    try {
      const emailToken = await this.EmailTokens.findOne({ token });

      if (!emailToken) {
        throw new UnauthorizedException('Invalid or expired token');
      }
  
      if (new Date() > emailToken.expiresAt) {
        throw new UnauthorizedException("Invalid or expired token");
      }

      const user = await this.User.findOne({ _id: emailToken.user });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (emailToken.emailType === EmailTokensTypes.VERIFY_EMAIL) {
        await this.EmailTokens.deleteOne({ token });
        await user.updateOne({
          isEmailVerified: true
        });
      }

      await user.save();

      return { content: 'Email successfully verified', emailType: emailToken.emailType, token: emailToken.token ? emailToken.token : '' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public extractUserIdFromToken(token: string) {
    try {
      
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
