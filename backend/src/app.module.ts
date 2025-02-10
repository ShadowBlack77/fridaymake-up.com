import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features/features.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CoreModule,
    FeaturesModule
  ],
})
export class AppModule {}
