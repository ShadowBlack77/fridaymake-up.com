import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SkinTypesModel } from '../models';
import { BACKEND_URL } from '@core';

@Injectable({
  providedIn: 'root'
})
export class SkinTypesService {

  private readonly httpClient: HttpClient = inject(HttpClient);

  public getAll(): Observable<{ content: SkinTypesModel[] }> {
    return this.httpClient.get<{ content: SkinTypesModel[] }>(`${BACKEND_URL}/api/v1/skin-types/`);
  }
}
