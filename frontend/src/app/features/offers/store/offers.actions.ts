import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { OffersModel } from "../models";

export const offersActions = createActionGroup({
  source: 'offers',
  events: {
    'Load Offers': emptyProps(),
    'Load Offers Successfully': props<{ offers: OffersModel[] }>(),
    'Load Offers Failure': props<{ errors: string }>()
  }
});