import { Injectable } from '@angular/core';
import { ApiServiceAbstract } from '../models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateOperationDto } from '../../store/debts/models';

@Injectable({
  providedIn: 'root'
})
export class OperationsService extends ApiServiceAbstract {

  readonly urlPath = 'operations';

  constructor(http: HttpClient) {
    super(http);
  }

  createOperation(createOperationDto: CreateOperationDto): Observable<void> {
    return this.http.post<void>(this.url, createOperationDto);
  }

  deleteOperation(id: string): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http.delete<void>(url);
  }

  acceptOperation(id: string): Observable<void> {
    const url = `${this.url}/${id}/creation/accept`;
    return this.http.post<void>(url, null);
  }

  declineOperation(id: string): Observable<void> {
    const url = `${this.url}/${id}/creation/decline`;
    return this.http.post<void>(url, null);
  }
}
