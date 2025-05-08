import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { AUTHENTICATION_UI_ROUTES } from '../constants/ui-routes';

export const tokenExpirationInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(
    tap({
      error: (err) => {
        if (err.status === 401) {
          // deleteAccessToken();
          router.navigate([AUTHENTICATION_UI_ROUTES.MAIN]);
        }
      },
    })
  );
};
