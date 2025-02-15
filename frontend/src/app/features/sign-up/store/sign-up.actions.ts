import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { SignUpModel } from "../models";

export const signUpAcitons = createActionGroup({
  source: 'signUp',
  events: {
    'Sign Up': props<{ signUp: SignUpModel }>(),
    'Sign Up Successfully': emptyProps(),
    'Sign Up Failure': props<{ errors: string }>()
  }
});