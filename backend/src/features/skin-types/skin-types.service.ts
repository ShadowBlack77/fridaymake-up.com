import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model } from 'mongoose';
import { SkinTypes } from 'src/libs/schemas';

@Injectable()
export class SkinTypesService {

  constructor(
    @InjectModel(SkinTypes.name) private readonly SkinTypesSchema: Model<SkinTypes>
  ) {}

  public async getAll(res: Response) {
    try {
      const allSkinTypes = await this.SkinTypesSchema.find();

      return res.status(200).json({ content: allSkinTypes });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
