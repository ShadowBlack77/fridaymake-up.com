import { Controller, Get, Res } from '@nestjs/common';
import { SkinTypesService } from './skin-types.service';
import { Response } from 'express';

@Controller('skin-types')
export class SkinTypesController {

  constructor(private readonly skinTypesService: SkinTypesService) {}

  @Get('/')
  public getAll(@Res() res: Response) {
    return this.skinTypesService.getAll(res);
  }
}
