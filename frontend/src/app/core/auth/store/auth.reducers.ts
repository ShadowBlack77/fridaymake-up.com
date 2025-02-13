import { createReducer, on } from "@ngrx/store";
import { AtuhState } from "./auth.state";
import { authActions } from "./auth.actions";

export const AuthReducer = createReducer(
  AtuhState.AUTH_INIT,
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
  })
);