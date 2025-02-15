import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions } from '../store/auth.actions';
import { AuthState } from '../store/auth.state';

export const userResolver: ResolveFn<boolean> = (route, state) => {

  const store: Store<AuthState> = inject(Store);

  store.dispatch(authActions.getUser());

  return true;
};
