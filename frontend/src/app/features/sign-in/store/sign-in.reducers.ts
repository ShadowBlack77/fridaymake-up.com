import { createReducer, on } from "@ngrx/store";
import { SignInState } from "./sign-in.state";
import { signInActions } from "./sign-in.actions";

export const SignInReducer = createReducer(
  SignInState.SIGN_IN_INIT,
  on(signInActions.signIn, (state) => {
    return {
      ...state
    }
  }),
  on(signInActions.signInSuccessfully, (state) => {
    return {
      ...state
    }
  }),
  on(signInActions.signInFailure, (state) => {
    return {
      ...state
    }
  })
);