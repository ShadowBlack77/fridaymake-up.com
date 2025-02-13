import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SkinTypesModel } from '../models';
import { BACKEND_URL } from '../../../core/env';

@Injectable({
  providedIn: 'root'
})
export class SkinTypesService {

  private readonly httpClient: HttpClient = inject(HttpClient);

  public getAll(): Observable<SkinTypesModel[]> {
    return this.httpClient.get<SkinTypesModel[]>(`${BACKEND_URL}/api/v1/skin-types/`);
  }
}
