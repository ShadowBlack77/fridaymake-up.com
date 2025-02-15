import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { OffersService } from "../services";
import { offersActions } from "./offers.actions";
import { map, switchMap, take } from "rxjs";
import { OffersModel } from "../models";

@Injectable()
export class OffersEffects {

  private readonly actions$: Actions = inject(Actions);
  private readonly offersService: OffersService = inject(OffersService);

  public loadOffers = createEffect(() => {
    return this.actions$.pipe(
      ofType(offersActions.loadOffers),
      switchMap(() => {
        return this.offersService.getAll().pipe(
          take(1),
          map((offers: { content: OffersModel[] }) => {
            return offersActions.loadOffersSuccessfully({ offers: offers.content });
          })
        )
      })
    )
  });
}