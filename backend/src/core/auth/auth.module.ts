import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailTokens, EmailTokensSchema, User, UserSchema } from 'src/libs/schemas';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './guards/jwt/jwt.guard';
import { MailsService } from '../mails/mails.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: EmailTokens.name, schema: EmailTokensSchema }
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRE_IN }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    MailsService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard
    }
  ]
})
export class AuthModule {}
