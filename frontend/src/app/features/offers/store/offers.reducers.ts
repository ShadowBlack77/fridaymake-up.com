import { createReducer, on } from "@ngrx/store";
import { OffersState } from "./offers.state";
import { offersActions } from "./offers.actions";

export const OffersReducer = createReducer(
  OffersState.OFFERS_INIT,
  on(offersActions.loadOffers, (state) => {
    return {
      ...state
    }
  }),
  on(offersActions.loadOffersSuccessfully, (state, actions) => {
    return {
      ...state,
      offers: actions.offers
    }
  }),
  on(offersActions.loadOffersFailure, (state) => {
    return {
      ...state
    }
  })
);