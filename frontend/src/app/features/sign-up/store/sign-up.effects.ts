import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../../core/auth";
import { signUpAcitons } from "./sign-up.actions";
import { catchError, map, of, switchMap, take } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class SignUpEffects {

  private readonly actions$ = inject(Actions);
  private readonly router: Router = inject(Router);
  private readonly authService: AuthService = inject(AuthService);

  public signUp = createEffect(() => {
    return this.actions$.pipe(
      ofType(signUpAcitons.signUp),
      switchMap(({ signUp }) => {
        return this.authService.signUp(signUp).pipe(
          take(1),
          map(() => {
            this.router.navigate(['/auth/sign-in']);

            return signUpAcitons.signUpSuccessfully();
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            let errorMessage: string = '';

            if (errorResponse.error.message.toLowerCase().includes('already taken')) {
              errorMessage = 'Email lub Nazwa użtywkonika są już zajęte!';
            }

            
            return of(signUpAcitons.signUpFailure({ error: errorMessage }));
          })  
        )
      })
    )
  })
}