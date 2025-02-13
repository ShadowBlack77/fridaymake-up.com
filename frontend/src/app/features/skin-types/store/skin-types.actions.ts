import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { SkinTypesModel } from "../models";

export const skinTypesActinos = createActionGroup({
  source: 'skinTypes',
  events: {
    'Load Skin Types': emptyProps(),
    'Load Skin Types Successfully': props<{ skinTypes: SkinTypesModel[] }>(),
    'Load Skin Types Failure': props<{ errors: string }>()
  }
});