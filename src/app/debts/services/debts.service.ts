import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiServiceAbstract } from '../../core/models';
import { CreateMultipleDebtDto, CreateSingleDebtDto, Debt, DebtListResponseDto } from '../../store/debts/models';

@Injectable()
export class DebtsService extends ApiServiceAbstract {
  readonly urlPath = 'debts';
  readonly multipleDebtPath = 'multiple';
  readonly singleDebtPath = 'single';

  getDebtsList(): Observable<DebtListResponseDto> {
    return this.http.get<DebtListResponseDto>(this.url);
  }

  getDebt(id: string): Observable<Debt> {
    const url = `${this.url}/${id}`;
    return this.http.get<Debt>(url);
  }

  deleteDebt(id: string): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http.delete<void>(url);
  }

  createMultipleDebt(createMultipleDebtDto: CreateMultipleDebtDto): Observable<Debt> {
    const url = `${this.url}/${this.multipleDebtPath}`;
    return this.http.post<Debt>(url, createMultipleDebtDto);
  }

  createSingleDebt(createSingleDebtDto: CreateSingleDebtDto): Observable<Debt> {
    const url = `${this.url}/${this.singleDebtPath}`;
    return this.http.post<Debt>(url, createSingleDebtDto);
  }

  acceptMultipleDebtCreation(id: string): Observable<Debt> {
    const url = `${this.url}/${this.multipleDebtPath}/${id}/creation/accept`;
    return this.http.post<Debt>(url, null);
  }

  declineMultipleDebtCreation(id: string): Observable<void> {
    const url = `${this.url}/${this.multipleDebtPath}/${id}/creation/decline`;
    return this.http.post<void>(url, null);
  }

  acceptAllOperations(id: string): Observable<Debt> {
    const url = `${this.url}/${this.multipleDebtPath}/${id}/accept_all_operations`;
    return this.http.post<Debt>(url, null);
  }

  acceptUserDeletedFromDebt(id: string): Observable<Debt> {
    const url = `${this.url}/${this.singleDebtPath}/${id}/i_love_lsd`;
    return this.http.post<Debt>(url, null);
  }

  connectUserToSingleDebt(id: string, userId: string): Observable<Debt> {
    const url = `${this.url}/${this.singleDebtPath}/${id}/connect_user`;
    return this.http.post<Debt>(url, {userId});
  }

  acceptUserConnecting(id: string): Observable<Debt> {
    const url = `${this.url}/${this.singleDebtPath}/${id}/connect_user/accept`;
    return this.http.post<Debt>(url, null);
  }

  declineUserConnecting(id: string): Observable<void> {
    const url = `${this.url}/${this.singleDebtPath}/${id}/connect_user/decline`;
    return this.http.post<void>(url, null);
  }

}
