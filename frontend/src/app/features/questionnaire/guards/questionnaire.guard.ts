import { CanActivateFn } from '@angular/router';

export const questionnaireGuard: CanActivateFn = (route, state) => {
  return true;
};
