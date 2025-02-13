import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_URL } from '../../../core/env';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  private readonly httpClient: HttpClient = inject(HttpClient);

  public get(): Observable<any> {
    return this.httpClient.get<any>(`${BACKEND_URL}/api/v1/questionnaires/`);
  }

  public save(questionnaire: any): Observable<unknown> {
    return this.httpClient.post(`${BACKEND_URL}/api/v1/questionnaires`, questionnaire);
  }

  public update(questionnaireId: string, questionnaire: any): Observable<unknown> {
    return this.httpClient.put(`${BACKEND_URL}/api/v1/questionnaires/${questionnaireId}`, questionnaire);
  }

  public delete(questionnaireId: string): Observable<unknown> {
    return this.httpClient.delete(`${BACKEND_URL}/api/v1/questionnaires/${questionnaireId}`);
  }
}
