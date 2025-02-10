import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MailsModule } from './mails/mails.module';

@Module({
  imports: [AuthModule, MailsModule]
})
export class CoreModule {}
