import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const signInActions = createActionGroup({
  source: 'signIn',
  events: {
    'Sign In': props<{ signIn: any }>(),
    'Sign In Successfully': emptyProps(),
    'Sign In Failure': emptyProps()
  }
});