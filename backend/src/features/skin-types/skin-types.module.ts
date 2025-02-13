import { Module } from '@nestjs/common';
import { SkinTypesController } from './skin-types.controller';
import { SkinTypesService } from './skin-types.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SkinTypes, SkinTypesSchema } from 'src/libs/schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: SkinTypes.name, schema: SkinTypesSchema }])],
  controllers: [SkinTypesController],
  providers: [SkinTypesService]
})
export class SkinTypesModule {}
