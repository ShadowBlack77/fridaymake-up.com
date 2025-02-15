import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model, Types } from 'mongoose';
import { QuestionnaireDto } from 'src/libs/models/questionnaire';
import { Questionnaire } from 'src/libs/schemas';

@Injectable()
export class QuestionnairesService {

  constructor(
    @InjectModel(Questionnaire.name) private readonly QuestionnaireSchema: Model<Questionnaire>
  ) {}

  public async getOne(res: Response, userId: string) {
    try {
      const userQuestionnaire = await this.QuestionnaireSchema.findOne({ user: new Types.ObjectId(userId) })
        .populate('user', 'username email role')
        .populate('offers')
        .populate('skinTypes');

      if (!userQuestionnaire) {
        throw new NotFoundException('Questionnaire not found');
      }

      return res.status(200).json({ content: userQuestionnaire });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async create(res: Response, userId: string, questionnaireDto: any) {
    try {
      await this.QuestionnaireSchema.create({ 
        ...questionnaireDto, 
        user: new Types.ObjectId(userId),
        offer: new Types.ObjectId(questionnaireDto.offerId),
        skinType: new Types.ObjectId(questionnaireDto.skinTypeId),
      });

      return res.status(201).json({ content: 'created' });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async update(res: Response, id: string, questionnaireDto: QuestionnaireDto) {
    try {
      
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid ID format');
      }

      const updatedQuestionnaire = await this.QuestionnaireSchema.findByIdAndUpdate(
        id,
        { $set: questionnaireDto },
        { new: true, runValidators: true }
      );

      if (!updatedQuestionnaire) {
        throw new NotFoundException('Questionnaire not found');
      }

      return res.status(200).json({ content: 'updated' });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async delete(res: Response, id: string) {
    try {

      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid ID format');
      }

      const result = await this.QuestionnaireSchema.deleteOne({ _id: new Types.ObjectId(id) });

      if (result.deletedCount === 0) {
        throw new NotFoundException('Questionnaire not found');
      }

      return res.status(200).json({ content: 'deleted' });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
