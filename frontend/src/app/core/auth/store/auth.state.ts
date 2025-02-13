import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface AuthState {
  readonly user: any | null;
}

export namespace AtuhState {
  export const AUTH_INIT: AuthState = {
    user: null
  }

  export const selectUserState = createFeatureSelector('auth');
  export const selectUser = createSelector(selectUserState, (state: any) => {
    return state.user;
  })
}