import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from '../helpers/alert.service';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(AlertService)
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        console.error('Client-side error:', error.error.message);
      } else {
        // Server-side error
        console.error('Server-side error:', {
          status: error.status,
          message: error.message,
          body: error.error,
        });

        // Handle specific status codes
        switch (error.status) {
          case 400:
            toastr.error(error.error.message)
            break;
          case 401:
            console.error('Unauthorized - Access is denied due to invalid credentials.');
            break;
          case 403:
            console.error('Forbidden - You do not have permission to access this resource.');
            break;
          case 404:
            console.error('Not Found - The requested resource could not be found.');
            break;
          case 500:
            console.error('Internal Server Error - An error occurred on the server.');
            break;
          default:
            console.error(`Unexpected status code: ${error.status}`);
        }
      }

      // Optionally, return a custom error or rethrow the original error
      return throwError(() => error);
    })
  );
};
