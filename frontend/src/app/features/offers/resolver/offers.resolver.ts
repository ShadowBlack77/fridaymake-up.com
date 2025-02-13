import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { offersActions } from '../store/offers.actions';

export const offersResolver: ResolveFn<boolean> = (route, state) => {

  const offersStore: Store<any> = inject(Store);

  offersStore.dispatch(offersActions.loadOffers());

  return true;
};
