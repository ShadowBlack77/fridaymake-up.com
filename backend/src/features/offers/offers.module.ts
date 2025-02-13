import { Module } from '@nestjs/common';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Offers, OffersSchema } from 'src/libs/schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: Offers.name, schema: OffersSchema }])],
  controllers: [OffersController],
  providers: [OffersService]
})
export class OffersModule {}
