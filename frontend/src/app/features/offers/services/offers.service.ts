import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OffersModel } from '../models';
import { API_KEY, BACKEND_URL } from '@core';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly defaultHeaders: HttpHeaders = new HttpHeaders({
    'x-bypass-interceptor': 'true',
    'api-key': `${API_KEY}`
  });


  public getAll(): Observable<{ content: OffersModel[] }> {
    return this.httpClient.get<{ content: OffersModel[] }>(`${BACKEND_URL}/api/v1/offers/`, {
      headers: this.defaultHeaders
    });
  }
}
