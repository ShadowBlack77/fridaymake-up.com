import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features/features.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '/backend/frontend-dist/frontend/browser')
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MOGNO_URI as string),
    CoreModule,
    FeaturesModule
  ],
})
export class AppModule {}
