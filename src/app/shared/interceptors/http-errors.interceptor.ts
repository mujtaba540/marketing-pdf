import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { DEFAULT_API_ERROR, HTTP_ERRORS } from '../constants/app.constants';
import { ToastMessageService } from '../services/toast-message.service';
import { inject } from '@angular/core';

export const httpErrorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastMessageService);

  return next(req).pipe(
    catchError((error) => {
      let errorText = error.statusText || DEFAULT_API_ERROR;
      if (error instanceof ErrorEvent) {
        errorText = error.error;
      } else {
        switch (error.status) {
          case 400:
            errorText = error.statusText || HTTP_ERRORS[400];
            break;
          case 401:
            errorText = error.statusText || HTTP_ERRORS[401];
            break;
          case 403:
            errorText = error.statusText || HTTP_ERRORS[403];
            break;
          case 404:
            errorText = error.statusText || HTTP_ERRORS[404];
            break;
          case 409:
            errorText = error.statusText || HTTP_ERRORS[409];
            break;
          case 500:
            errorText = error.statusText || HTTP_ERRORS[500];
            break;
          default:
            errorText = DEFAULT_API_ERROR;
        }
      }
      //toast-message for error
      toastService.showErrorToastMessage(errorText);
      return throwError(() => new HttpErrorResponse(error));
    })
  );
};
