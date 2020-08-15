import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiServiceAbstract } from '../models/api-service.abstract';
import { tap } from 'rxjs/operators';
import { FullAuthData } from '../../store/auth/models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageHelper } from '../helpers/local-storage.helper';
import { Router } from '@angular/router';
import { ReturnUrl } from '../models/query-params/return-url';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiServiceAbstract {

  static REFRESH_TOKEN_API = 'refresh_token';

  readonly urlPath = 'login';

  constructor(
    protected http: HttpClient,
    private router: Router,
  ) {
    super(http);
  }

  login(email: string, password: string): Observable<FullAuthData> {
    const url = `${this.url}/local`;
    return this.http.post<FullAuthData>(url, {email, password}).pipe(
      tap(authData => LocalStorageHelper.writeLoggedUser(authData))
    );
  }

  signUp(email: string, password: string): Observable<FullAuthData> {
    const url = `${this.baseUrl}/sign_up/local`;
    return this.http.post<FullAuthData>(url, {email, password}).pipe(
      tap(authData => LocalStorageHelper.writeLoggedUser(authData))
    );
  }

  refreshToken(token: string): Observable<FullAuthData> {
    const url = `${this.url}/${AuthService.REFRESH_TOKEN_API}`;
    const headers = new HttpHeaders().append('Authorization', `Bearer ${token}`);
    return this.http.get<FullAuthData>(url, {headers}).pipe(
      tap(authData => LocalStorageHelper.writeLoggedUser(authData))
    );
  }

  logout(returnUrl?: string): void {
    this.router.navigate(['auth'], {
      queryParams: returnUrl ? new ReturnUrl(returnUrl) : {}
    });
    LocalStorageHelper.clearLoggedUser();
  }

}
