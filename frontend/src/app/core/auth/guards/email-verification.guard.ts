import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';
import { UserModel } from '../models';

export const emailVerificationGuard: CanActivateFn = (route, state) => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.getUser().pipe(
    take(1),
    map((user: { content: UserModel }) => {
      if (user.content.isEmailVerified) {
        return true;
      }

      router.navigate(['/']);

      return false;
    })
  );
};
