import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserModel } from "../models";

export interface AuthState {
  readonly user: UserModel | null;
}

export namespace AuthState {
  export const AUTH_INIT: AuthState = {
    user: null
  }

  export const selectUserState = createFeatureSelector<AuthState>('auth');
  export const selectUser = createSelector(selectUserState, (state: AuthState) => {
    return state.user;
  })
}