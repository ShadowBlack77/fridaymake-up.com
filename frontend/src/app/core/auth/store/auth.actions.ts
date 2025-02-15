import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { UserModel } from "../models";

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    'Sign Out': emptyProps(),
    'Sign Out Successfully': emptyProps(),
    'Sign Out Failure': emptyProps(),
    'Get User': emptyProps(),
    'Get User Successfully': props<{ user: UserModel | null }>(),
    'Get User Failure': emptyProps()
  }
});