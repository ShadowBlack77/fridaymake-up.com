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
    'Get User Failure': emptyProps(),
    'Send Email Verification': emptyProps(),
    'Send Email Verification Successfully': emptyProps(),
    'Send Email Verification Failure': emptyProps(),
    'Send Email Reset Password': props<{ email: string }>(),
    'Send Email Reset Password Successfully': emptyProps(),
    'Send Email Reset Password Failure': props<{ error: string }>(),
    'Reset Password': props<{ newPassword: { newPassword: string, newPasswordConfirmation: string }, sessionId: string }>(),
    'Reset Password Successfully': emptyProps(),
    'Reset Password Failure': props<{ error: string }>()
  }
});