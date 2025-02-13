import { Controller, Get, Res } from '@nestjs/common';
import { OffersService } from './offers.service';
import { Response } from 'express';

@Controller('offers')
export class OffersController {

  constructor(private readonly offersService: OffersService) {}

  @Get('/')
  public getAll(@Res() res: Response) {
    return this.offersService.getAll(res);
  }
}
