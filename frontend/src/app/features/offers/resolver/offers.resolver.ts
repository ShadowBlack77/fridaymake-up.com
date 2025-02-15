import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { offersActions } from '../store/offers.actions';
import { OffersState } from '../store/offers.state';

export const offersResolver: ResolveFn<boolean> = (route, state) => {

  const offersStore: Store<OffersState> = inject(Store);

  offersStore.dispatch(offersActions.loadOffers());

  return true;
};
