import { Injectable } from '@angular/core';
import { ApiServiceAbstract } from '../models';
import { Observable } from 'rxjs';
import { Currency } from '../../store/common/models';

@Injectable({
  providedIn: 'root'
})
export class CommonService extends ApiServiceAbstract {
  readonly urlPath = 'common';

  getCurrencies(): Observable<Currency[]> {
    const url = `${this.url}/currency`;
    return this.http.get<Currency[]>(url);
  }

}
