import { createFeatureSelector } from "@ngrx/store";

export interface SignUpState {
  readonly error: String | null;
}

export namespace SignUpState {
  export const SIGN_UP_INIT: SignUpState = {
    error: null
  }

  export const selectSignUpState = createFeatureSelector<SignUpState>('signUp');
}