import { Injectable } from '@angular/core';
import { ApiServiceAbstract } from '../models';
import { Observable } from 'rxjs';
import { Currency } from '../../store/common/models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService extends ApiServiceAbstract {
  readonly urlPath = 'common';

  constructor(http: HttpClient) {
    super(http);
  }

  getCurrencies(): Observable<Currency[]> {
    const url = `${this.url}/currency`;
    return this.http.get<Currency[]>(url);
  }

}
