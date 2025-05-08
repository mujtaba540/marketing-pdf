import { HttpInterceptorFn } from '@angular/common/http';
import { setJWTToken } from '../utils/app.utils';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authReq = req.clone({
    setHeaders: setJWTToken(),
  });
  return next(authReq);
};
