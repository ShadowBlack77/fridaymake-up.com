import { createReducer, on } from "@ngrx/store";
import { AuthState } from "./auth.state";
import { authActions } from "./auth.actions";

export const AuthReducer = createReducer(
  AuthState.AUTH_INIT,
  on(authActions.getUser, (state) => {
    return {
      ...state
    }
  }),
  on(authActions.getUserSuccessfully, (state, actions) => {
    return {
      ...state,
      user: actions.user
    }
  }),
  on(authActions.getUserFailure, (state, actions) => {
    return {
      ...state
    }
  }),
  on(authActions.signOut, (state) => {
    return {
      ...state
    }
  }),
  on(authActions.signOutSuccessfully, (state) => {
    return {
      ...state,
      user: null
    }
  }),
  on(authActions.signOutFailure, (state, actions) => {
    return {
      ...state
    }
  }),
  on(authActions.sendEmailVerification, (state) => {
    return {
      ...state
    }
  }),
  on(authActions.sendEmailVerificationSuccessfully, (state) => {
    return {
      ...state
    }
  }),
  on(authActions.sendEmailVerificationFailure, (state) => {
    return {
      ...state
    }
  }),
  on(authActions.sendEmailResetPassword, (state) => {
    return {
      ...state
    }
  }),
  on(authActions.sendEmailResetPasswordSuccessfully, (state) => {
    return {
      ...state,
      error: null
    }
  }),
  on(authActions.sendEmailResetPasswordFailure, (state, actions) => {
    return {
      ...state,
      error: actions.error
    }
  }),
  on(authActions.resetPassword, (state) => {
    return {
      ...state
    }
  }),
  on(authActions.resetPasswordSuccessfully, (state) => {
    return {
      ...state
    }
  }),
  on(authActions.resetPasswordFailure, (state, actions) => {
    return {
      ...state,
      error: actions.error
    }
  })
);