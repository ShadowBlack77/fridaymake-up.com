import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, map, of, take } from 'rxjs';
import { QuestionnaireModel } from '../models';
import { QuestionnaireService } from '../services';

export const questionnaireGuard: CanActivateFn = (route, state) => {

  const questionnaireService: QuestionnaireService = inject(QuestionnaireService);
  const router: Router = inject(Router);
  
  return questionnaireService.get().pipe(
    take(1),
    map((res: { content: QuestionnaireModel }) => {
      const questionnaire = res.content;

      if (questionnaire) {
        return true;
      }

      router.navigate(['/account']);

      return false;
    }),
    catchError(() => {
      router.navigate(['/account']);

      return of(false);
    })
  )
};
