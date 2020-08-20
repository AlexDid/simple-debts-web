import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LocalStorageHelper } from '../helpers';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  intercept<T>(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    // add auth header with jwt if selectedUser is logged in and request is to the api url
    const user = LocalStorageHelper.getLoggedUser();
    const isLoggedIn = user && user.token;
    const isApiUrl = request.url.startsWith(environment.API_URL);
    const isRefreshToken = request.url.includes(AuthService.REFRESH_TOKEN_API);

    if (isLoggedIn && isApiUrl && !isRefreshToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${user.token}` }
      });
    }

    return next.handle(request);
  }
}
