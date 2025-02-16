import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services';
import { inject } from '@angular/core';
import { catchError, switchMap, take, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoadingScreenActions } from '../../../features/loading-screen/store/loading-screen.actions';
import { LoadingScreenState } from '../../../features/loading-screen/store/loading-screen.state';
import { API_KEY } from '../../env';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const loadingScreenStore: Store<LoadingScreenState> = inject(Store);

  if (req.headers.has('x-bypass-interceptor')) {
    return next(req);
  }

  return authService.checkTokenValidity().pipe(
    take(1),
    switchMap(() => {
      const updatedRequest = req.clone({
        withCredentials: true,
        setHeaders: {
          'api-key': `${API_KEY}`,
        }
      });

      return next(updatedRequest);
    }),
    catchError((errorResponse: HttpErrorResponse) => {

      if (errorResponse.status === 401) {
        return authService.refreshToken().pipe(
          take(1),
          switchMap(() => {
            const updatedRequest = req.clone({
              withCredentials: true,
              setHeaders: {
                'api-key': `${API_KEY}`,
              }
            });

            return next(updatedRequest);
          }),
          catchError(() => {
            router.navigate(['/']);
            loadingScreenStore.dispatch(LoadingScreenActions.hideLoadingScreen());

            return throwError(() => new Error('Sessionexpired. User has been logged out'));
          })
        )
      }

      return throwError(() => errorResponse);
    })
  )
};
