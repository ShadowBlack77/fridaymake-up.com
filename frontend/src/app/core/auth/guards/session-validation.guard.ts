import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services';
import { inject } from '@angular/core';
import { catchError, map, of, take } from 'rxjs';

export const sessionValidationGuard: CanActivateFn = (route, state) => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const sessionId = route.params['sessionId'];

  return authService.checkSessionTokenValidation(sessionId).pipe(
    take(1),
    map((res) => {
      return true;
    }),
    catchError(() => {
      router.navigate(['/']);

      return of(false);
    })
  );
};
