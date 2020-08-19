import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { LocalStorageHelper } from '../helpers';
import { Observable, throwError } from 'rxjs';
import { catchError, first, switchMap } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept<T>(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    return next.handle(request).pipe(catchError(err => {
      const logoutErrors = [401, 403];
      const loggedUser = LocalStorageHelper.getLoggedUser();
      const isRefreshToken = request.url.includes('refresh_token');

      if (isRefreshToken) {
        this.authService.logout();
        return throwError('refresh_failed');
      }

      if (logoutErrors.includes(err.status) && loggedUser) {
        return this.authService.refreshToken(loggedUser.refreshToken).pipe(
          first(),
          switchMap(({token}) => next.handle(request.clone({
            headers: new HttpHeaders().append('Authorization', `Bearer ${token}`)
          }))),
          catchError(e => {
            this.authService.logout();
            return throwError(e);
          })
        );
      }

      const error = err.error || err;

      console.error(err);
      return throwError(error);
    }));
  }

}
