import { createReducer, on } from "@ngrx/store";
import { SignUpState } from "./sign-up.state";
import { signUpAcitons } from "./sign-up.actions";

export const SignUpReducer = createReducer(
  SignUpState.SIGN_UP_INIT,
  on(signUpAcitons.signUp, (state) => {
    return {
      ...state
    }
  }),
  on(signUpAcitons.signUpSuccessfully, (state) => {
    return {
      ...state,
      error: null
    }
  }),
  on(signUpAcitons.signUpFailure, (state, props) => {
    return {
      ...state,
      error: props.error
    }
  })
)