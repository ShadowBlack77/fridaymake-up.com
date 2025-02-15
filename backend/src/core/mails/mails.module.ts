import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailTokens, EmailTokensSchema, User, UserSchema } from 'src/libs/schemas';
import { MailsService } from './mails.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: EmailTokens.name, schema: EmailTokensSchema },
      { name: User.name, schema: UserSchema }
    ]),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAILS_HOST,
        port: +process.env.MAILS_PORT!,
        secure: true,
        auth: {
          user: process.env.MAILS_USER,
          pass: process.env.MAILS_PASS
        }
      },
      defaults: {
        from: process.env.MAILS_FROM
      },
      template: {
        dir: join(__dirname, './templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      }
    })
  ],
  providers: [MailsService]
})
export class MailsModule {}
