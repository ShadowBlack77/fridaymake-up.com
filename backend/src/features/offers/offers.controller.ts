import { Controller, Get, Res } from '@nestjs/common';
import { OffersService } from './offers.service';
import { Response } from 'express';
import { Public } from 'src/libs/decorators';

@Controller('offers')
export class OffersController {

  constructor(private readonly offersService: OffersService) {}

  @Public()
  @Get('/')
  public getAll(@Res() res: Response) {
    return this.offersService.getAll(res);
  }
}
