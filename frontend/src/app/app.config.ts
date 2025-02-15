import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { LoadingScreenReducer } from './features/loading-screen/store/loading-screen.reducers';
import { LoadingScreenEffects } from './features/loading-screen/store/loading-screen.effects';
import { SignInReducer } from './features/sign-in/store/sign-in.reducers';
import { SignInEffects } from './features/sign-in/store/sign-in.effects';
import { AuthReducer } from './core/auth/store/auth.reducers';
import { AuthEffects } from './core/auth/store/auth.effects';
import { authInterceptor } from './core/auth/interceptors';
import { OffersReducer } from './features/offers/store/offers.reducers';
import { OffersEffects } from './features/offers/store/offers.effects';
import { SkinTypesReducer } from './features/skin-types/store/skin-types.reducers';
import { SkinTypesEffects } from './features/skin-types/store/skin-types.effects';
import { QuestionnaireReducer } from './features/questionnaire/store/questionnaire.reducers';
import { QuestionnaireEffects } from './features/questionnaire/store/questionnaire.effects';
import { SignUpReducer } from './features/sign-up/store/sign-up.reducers';
import { SignUpEffects } from './features/sign-up/store/sign-up.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({
      loadingScreen: LoadingScreenReducer,
      signIn: SignInReducer,
      signUp: SignUpReducer,
      auth: AuthReducer,
      offers: OffersReducer,
      skinTypes: SkinTypesReducer,
      questionnaire: QuestionnaireReducer
    }),
    provideEffects([
      LoadingScreenEffects,
      SignInEffects,
      SignUpEffects,
      AuthEffects,
      OffersEffects,
      SkinTypesEffects,
      QuestionnaireEffects
    ])
  ]
};
