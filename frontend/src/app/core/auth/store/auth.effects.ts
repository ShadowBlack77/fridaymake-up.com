import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { authActions } from "./auth.actions";
import { AuthService } from "../services";
import { catchError, map, of, switchMap, take } from "rxjs";
import { Router } from "@angular/router";
import { QuestionnaireService } from "../../../features/questionnaire/services/questionnaire.service";
import { LoadingScreenActions } from "../../../features/loading-screen/store/loading-screen.actions";
import { UserModel } from "../models";
import { LoadingScreenState } from "../../../features/loading-screen/store/loading-screen.state";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class AuthEffects {

  private readonly actions$ = inject(Actions);
  private readonly router: Router = inject(Router);
  private readonly loadingScreenStore: Store<LoadingScreenState> = inject(Store);
  private readonly authService: AuthService = inject(AuthService);
  private readonly questionnaireService: QuestionnaireService = inject(QuestionnaireService);

  public getUser = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.getUser),
      switchMap(() => {
        this.loadingScreenStore.dispatch(LoadingScreenActions.showLoadingScreen());

        return this.authService.getUser().pipe(
          take(1),
          switchMap((user: { content: UserModel }) => {
            return this.questionnaireService.get().pipe(
              take(1),
              map((questionnaire) => {
                this.loadingScreenStore.dispatch(LoadingScreenActions.hideLoadingScreen());

                return authActions.getUserSuccessfully({ user: user.content });
              }),
              catchError(() => {
                this.loadingScreenStore.dispatch(LoadingScreenActions.hideLoadingScreen());

                return of(authActions.getUserSuccessfully({ user: user.content }));
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
  });

  public sendEmailVerification = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.sendEmailVerification),
      switchMap(() => {
        return this.authService.sendEmailVerification().pipe(
          take(1),
          map(() => {
            return authActions.sendEmailVerificationSuccessfully();
          })
        )
      })
    )
  });

  public sendEmailResetPassword = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.sendEmailResetPassword),
      switchMap(({ email }) => {
        return this.authService.sendEmailResetPassword({ email: email }).pipe(
          take(1),
          map(() => {
            return authActions.sendEmailResetPasswordSuccessfully();
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            let errorMessage: string = 'Server Error';

            if (errorResponse.error.message.toLowerCase().includes('not found')) {
              errorMessage = 'Adres email nie został znaleziony w bazie danych. Oznacza to, że nie jest przypisany do żadnego konta!';
            }

            return of(authActions.sendEmailResetPasswordFailure({ error: errorMessage }));
          })
        )
      })
    )
  });

  public resetPassword = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.resetPassword),
      switchMap(({ newPassword, sessionId }) => {
        return this.authService.resetPassword(newPassword, sessionId).pipe(
          take(1),
          map(() => {
            this.router.navigate(['/auth/sign-in']);

            return authActions.resetPasswordSuccessfully();
          })
        )
      })
    )
  });
}