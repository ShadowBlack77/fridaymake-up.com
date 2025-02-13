import { ResolveFn } from '@angular/router';

export const questionnaireResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
