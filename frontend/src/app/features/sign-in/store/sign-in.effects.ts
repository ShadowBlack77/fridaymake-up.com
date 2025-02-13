import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../../core/auth";
import { signInActions } from "./sign-in.actions";
import { map, switchMap, take } from "rxjs";

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
          map((res: any) => {
            this.router.navigate(['/']);

            return signInActions.signInSuccessfully();
          })
        )
      })
    )
  })
}