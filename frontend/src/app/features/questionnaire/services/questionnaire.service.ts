import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_URL } from '@core';
import { QuestionnaireModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  private readonly httpClient: HttpClient = inject(HttpClient);

  public get(): Observable<{ content: QuestionnaireModel }> {
    return this.httpClient.get<{ content: QuestionnaireModel }>(`${BACKEND_URL}/api/v1/questionnaires/`);
  }

  public save(questionnaire: QuestionnaireModel): Observable<unknown> {
    return this.httpClient.post(`${BACKEND_URL}/api/v1/questionnaires`, questionnaire);
  }

  public update(questionnaireId: string, questionnaire: QuestionnaireModel): Observable<unknown> {
    return this.httpClient.put(`${BACKEND_URL}/api/v1/questionnaires/${questionnaireId}`, questionnaire);
  }

  public delete(questionnaireId: string): Observable<unknown> {
    return this.httpClient.delete(`${BACKEND_URL}/api/v1/questionnaires/${questionnaireId}`);
  }
}
