import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { SkinTypesService } from "../services";
import { skinTypesActinos } from "./skin-types.actions";
import { map, switchMap, take } from "rxjs";

@Injectable()
export class SkinTypesEffects {

  private readonly actions$: Actions = inject(Actions);
  private readonly skinTypesService: SkinTypesService = inject(SkinTypesService);

  public loadSkinTypes = createEffect(() => {
    return this.actions$.pipe(
      ofType(skinTypesActinos.loadSkinTypes),
      switchMap(() => {
        return this.skinTypesService.getAll().pipe(
          take(1),
          map((skinTypes: any) => {
            return skinTypesActinos.loadSkinTypesSuccessfully({ skinTypes: skinTypes.content });
          })
        )
      })
    )
  })
}