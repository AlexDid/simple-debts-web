import { Injectable } from '@angular/core';
import { ApiServiceAbstract, User } from '../models';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiServiceAbstract {
  readonly urlPath = 'users';

  constructor(http: HttpClient) {
    super(http);
  }

  searchUsers(name: string): Observable<User[]> {
    if (!name) {
      return of([]);
    }
    const params = new HttpParams().append('name', name);
    return this.http.get<User[]>(this.url, {params});
  }
}
