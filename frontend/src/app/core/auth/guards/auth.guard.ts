import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services';
import { inject } from '@angular/core';
import { catchError, map, of, take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export const authGuard: CanActivateFn = (route, state) => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkTokenValidity().pipe(
    take(1),
    map(() => {
      router.navigate(['/']);

      return false;
    }),
    catchError((errorResponse: HttpErrorResponse) => {
      
      if (errorResponse.status === 401) {
        return authService.refreshToken().pipe(
          take(1),
          map(() => {
            router.navigate(['/']);

            return false;
          }),
          catchError(() => {
            
            return of(true);
          })
        )
      }

      return of(true);
    })
  );
};
