import { Injectable } from '@nestjs/common';

@Injectable()
export class OffersService {

  public async getAll() {
    return { content: 'All offers' };
  }
}
