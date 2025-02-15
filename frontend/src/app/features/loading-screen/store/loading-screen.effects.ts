import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LoadingScreenActions } from "./loading-screen.actions";
import { map } from "rxjs";
import gsap from 'gsap';

@Injectable()
export class LoadingScreenEffects {

  private readonly actions$ = inject(Actions);

  public showLoadingScreen = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoadingScreenActions.showLoadingScreen),
      map(() => {
        gsap.to('.loading-screen', {
          delay: 0,
          duration: 0,
          opacity: 1,
          zIndex: 9999
        });

        gsap.to('body', {
          overflowY: 'hidden'
        });

        return LoadingScreenActions.showLoadingScreenSuccessfully();
      })
    )
  })

  public hideLoadingScreen = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoadingScreenActions.hideLoadingScreen),
      map(() => {
        gsap.to('.loading-screen', {
          delay: 0.5,
          duration: 0.25,
          opacity: 0,
          zIndex: -9999
        });

        gsap.to('body', {
          overflowY: 'auto'
        });

        return LoadingScreenActions.hideLoadingScreenSuccessfully();
      })
    )
  })
}