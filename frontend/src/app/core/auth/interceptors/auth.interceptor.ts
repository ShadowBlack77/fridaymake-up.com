import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services';
import { inject } from '@angular/core';
import { catchError, switchMap, take, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (req.headers.has('x-bypass-interceptor')) {
    return next(req);
  }

  return authService.checkTokenValidity().pipe(
    take(1),
    switchMap(() => {
      const updatedRequest = req.clone({
        withCredentials: true,
        // setHeaders: {
        //   'api-key': `${API_KEY}`,
        // }
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
              // setHeaders: {
              //   'api-key': `${API_KEY}`,
              // }
            });

            return next(updatedRequest);
          }),
          catchError(() => {
            router.navigate(['/']);

            return throwError(() => new Error('Sessionexpired. User has been logged out'));
          })
        )
      }

      return throwError(() => errorResponse);
    })
  )
};
