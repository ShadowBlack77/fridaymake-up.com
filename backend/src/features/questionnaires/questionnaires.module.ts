import { Module } from '@nestjs/common';
import { QuestionnairesService } from './questionnaires.service';
import { QuestionnairesController } from './questionnaires.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Questionnaire, QuestionnaireSchema } from 'src/libs/schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: Questionnaire.name, schema: QuestionnaireSchema }])],
  providers: [QuestionnairesService],
  controllers: [QuestionnairesController]
})
export class QuestionnairesModule {}
