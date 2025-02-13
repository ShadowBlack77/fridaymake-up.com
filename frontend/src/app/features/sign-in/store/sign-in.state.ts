import { createFeatureSelector } from "@ngrx/store";

export interface SignInState {
  readonly error: string | null;
}

export namespace SignInState {
  export const SIGN_IN_INIT: SignInState = {
    error: null
  }

  export const selectSignInState = createFeatureSelector('signIn');
}