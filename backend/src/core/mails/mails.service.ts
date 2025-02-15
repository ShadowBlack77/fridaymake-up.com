import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailTokens, User } from 'src/libs/schemas';
import { MailerService as NestMailerSerivce } from '@nestjs-modules/mailer';

@Injectable()
export class MailsService {

  constructor(
    @InjectModel(EmailTokens.name) private readonly EmailTokens: Model<EmailTokens>,
    @InjectModel(User.name) private readonly User: Model<User>,
    private readonly mailerService: NestMailerSerivce
  ) {}

  public async sendMail() {
    
  }

  public async generateEmailTokens() {

  }

  public async checkTokenValidation() {

  }
}
