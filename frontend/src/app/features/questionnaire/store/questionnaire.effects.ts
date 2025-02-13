import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { QuestionnaireService } from "../services";
import { AuthService } from "../../../core/auth";
import { Store } from "@ngrx/store";
import { StepperService } from "../../../shared";
import { catchError, map, of, switchMap, take } from "rxjs";
import { questionnaireActions } from "./questionnaire.actions";
import { Router } from "@angular/router";
import { LoadingScreenActions } from "../../loading-screen/store/loading-screen.actions";

@Injectable()
export class QuestionnaireEffects {

  private readonly actions$: Actions = inject(Actions);
  private readonly questionnaireService: QuestionnaireService = inject(QuestionnaireService);
  private readonly authService: AuthService = inject(AuthService);
  private readonly loadingScreenStore: Store<any> = inject(Store);
  private readonly stepperService: StepperService = inject(StepperService);
  private readonly router: Router = inject(Router);
  
  public saveQuestionnaire = createEffect(() => {
    return this.actions$.pipe(
      ofType(questionnaireActions.saveQuestionnaire),
      switchMap(({ questionnaire }) => {
        return this.questionnaireService.save(questionnaire).pipe(
          take(1),
          map(() => {
            this.stepperService.invokeGoToNextStep();
            
            return questionnaireActions.saveQuestionnaireSuccessfully({ questionnaire });
          })
        )
      })
    )
  });

  public getQuestionnaire = createEffect(() => {
    return this.actions$.pipe(
      ofType(questionnaireActions.getQuestionnaire),
      switchMap(() => {
        return this.questionnaireService.get().pipe(
          take(1),
          map((questionnaire: any) => {
            return questionnaireActions.getQuestionnaireSuccessfully({ questionnaire: questionnaire.content })
          }),
          catchError(() => {
            this.loadingScreenStore.dispatch(LoadingScreenActions.hideLoadingScreen());

            return of(questionnaireActions.getQuestionnaireFailure({ errors: 'Questionnaire not found' }));
          })
        )
      })
    )
  });

  public updateQuestionnaire = createEffect(() => {
    return this.actions$.pipe(
      ofType(questionnaireActions.updateQuestionnaire),
      switchMap(({ questionnaire }) => {
        return this.questionnaireService.update(questionnaire._id, questionnaire).pipe(
          take(1),
          map(() => {
            this.stepperService.invokeGoToNextStep();

            return questionnaireActions.updateQuestionnaireSuccessfully({ questionnaire });
          })
        )
      })
    )
  });

  public removeQuestionnaire = createEffect(() => {
    return this.actions$.pipe(
      ofType(questionnaireActions.removeQuestionnaire),
      switchMap(({ questionnaireId }) => {
        return this.questionnaireService.delete(questionnaireId).pipe(
          take(1),
          map(() => {
            this.router.navigate(['/']);

            return questionnaireActions.removeQuestionnaireSuccessfully();
          })
        )
      })
    )
  })
}