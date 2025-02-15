import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { SignInModel } from "../models";

export const signInActions = createActionGroup({
  source: 'signIn',
  events: {
    'Sign In': props<{ signIn: SignInModel }>(),
    'Sign In Successfully': emptyProps(),
    'Sign In Failure': props<{ errors: string }>()
  }
});