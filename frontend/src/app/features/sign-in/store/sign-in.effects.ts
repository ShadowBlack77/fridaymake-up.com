import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../../core/auth";
import { signInActions } from "./sign-in.actions";
import { catchError, map, of, switchMap, take } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class SignInEffects {

  private readonly actions$ = inject(Actions);
  private readonly router: Router = inject(Router);
  private readonly authService: AuthService = inject(AuthService);
  
  public signIn = createEffect(() => {
    return this.actions$.pipe(
      ofType(signInActions.signIn),
      switchMap(({ signIn }) => {
        return this.authService.signIn(signIn).pipe(
          take(1),
          map(() => {
            this.router.navigate(['/']);

            return signInActions.signInSuccessfully();
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            let error: string = '';

            if (errorResponse.error.message.toLocaleLowerCase().includes('invalid credentials')) {
              error = 'Niepoprawny login lub hasło';
            }

            return of(signInActions.signInFailure({ errors: error }));
          })
        )
      })
    )
  })
}