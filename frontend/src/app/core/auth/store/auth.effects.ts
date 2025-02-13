import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { authActions } from "./auth.actions";
import { AuthService } from "../services";
import { map, switchMap, take } from "rxjs";
import { Router } from "@angular/router";
import { QuestionnaireService } from "../../../features/questionnaire/services/questionnaire.service";
import { LoadingScreenActions } from "../../../features/loading-screen/store/loading-screen.actions";

@Injectable()
export class AuthEffects {

  private readonly actions$ = inject(Actions);
  private readonly router: Router = inject(Router);
  private readonly store: Store<any> = inject(Store);
  private readonly authService: AuthService = inject(AuthService);
  private readonly questionnaireService: QuestionnaireService = inject(QuestionnaireService);

  public getUser = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.getUser),
      switchMap(() => {
        this.store.dispatch(LoadingScreenActions.showLoadingScreen());

        return this.authService.getUser().pipe(
          take(1),
          switchMap((user: any) => {
            return this.questionnaireService.get().pipe(
              take(1),
              map((questionnaire) => {
                this.store.dispatch(LoadingScreenActions.hideLoadingScreen());

                return authActions.getUserSuccessfully({ user: user.content });
              })
            )
          })
        )
      })
    )
  });

  public signOut = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.signOut),
      switchMap(() => {
        return this.authService.signOut().pipe(
          take(1),
          map(() => {
            this.router.navigate(['/']);

            return authActions.signOutSuccessfully();
          })
        )
      })
    )
  })
}