import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OffersModel } from '../models';
import { BACKEND_URL } from '../../../core/env';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  private readonly httpClient: HttpClient = inject(HttpClient);

  public getAll(): Observable<OffersModel[]> {
    return this.httpClient.get<OffersModel[]>(`${BACKEND_URL}/api/v1/offers/`);
  }
}
