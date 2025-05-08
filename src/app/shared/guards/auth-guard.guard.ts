import { CanActivateFn, Router } from '@angular/router';
import { getAccessToken } from '../utils/app.utils';
import { AUTHENTICATION_UI_ROUTES } from '../constants/ui-routes';
import { inject } from '@angular/core';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (!getAccessToken()) {
    router.navigate([`/${AUTHENTICATION_UI_ROUTES.MAIN}`]);
    return false;
  }
  return true;
};
