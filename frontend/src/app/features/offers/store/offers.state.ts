import { createFeatureSelector, createSelector } from "@ngrx/store";
import { OffersModel } from "../models";

export interface OffersState {
  readonly offers: OffersModel[];
}

export namespace OffersState {
  export const OFFERS_INIT: OffersState = {
    offers: []
  }

  export const selectOffersState = createFeatureSelector<OffersState>('offers');
  export const selectOffers = createSelector(selectOffersState, (state: OffersState) => {
    return state.offers;
  });
}