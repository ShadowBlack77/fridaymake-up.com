import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model } from 'mongoose';
import { Offers } from 'src/libs/schemas';

@Injectable()
export class OffersService {

  constructor(
    @InjectModel(Offers.name) private readonly OffersSchema: Model<Offers>
  ) {}

  public async getAll(res: Response) {
    try {
      const allOffers = await this.OffersSchema.find();

      return res.status(200).json({ content: allOffers });
    } catch (error) {
      throw new InternalServerErrorException(error.message);      
    }
  }
}
