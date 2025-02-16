import { Controller, Get, Res } from '@nestjs/common';
import { SkinTypesService } from './skin-types.service';
import { Response } from 'express';
import { Public } from 'src/libs/decorators';

@Controller('skin-types')
export class SkinTypesController {

  constructor(private readonly skinTypesService: SkinTypesService) {}

  @Public()
  @Get('/')
  public getAll(@Res() res: Response) {
    return this.skinTypesService.getAll(res);
  }
}
