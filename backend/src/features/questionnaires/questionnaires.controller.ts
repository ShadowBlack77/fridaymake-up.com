import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { QuestionnairesService } from './questionnaires.service';
import { GetCurrentUserId } from 'src/libs/decorators';
import { QuestionnaireRequest } from 'src/libs/models/questionnaire';

@Controller('questionnaires')
export class QuestionnairesController {

  constructor(private readonly questionnairesService: QuestionnairesService) {}

  @Get('/')
  public getOne(@Res() res: Response, @GetCurrentUserId() userId: string) {
    return this.questionnairesService.getOne(res, userId);
  }

  @Post('/')
  public create(@Res() res: Response, @GetCurrentUserId() userId: string, @Body() questionnaireRequest: QuestionnaireRequest) {
    return this.questionnairesService.create(res, userId, questionnaireRequest);
  }

  @Put('/:id')
  public update(@Res() res: Response, @Param('id') id: string, @Body() questionnaireRequest: QuestionnaireRequest) {
    return this.questionnairesService.update(res, id, questionnaireRequest);
  }

  @Delete('/:id')
  public delete(@Res() res: Response, @Param('id') id: string) {
    return this.questionnairesService.delete(res, id);
  }
}
