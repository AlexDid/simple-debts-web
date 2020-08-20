import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { catchError, first, map, mergeMap, tap } from 'rxjs/operators';

import * as DebtsActions from './debts.actions';
import { DebtsService } from '../../debts/services/debts.service';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorSnackbarHelper } from '../../core/helpers';
import { DialogService } from '../../core/modules/dialog/services/dialog.service';
import { Router } from '@angular/router';


@Injectable()
export class DebtsEffects {

  private readonly errorActions = [
    DebtsActions.loadDebtsError,
    DebtsActions.loadDebtError,
    DebtsActions.deleteDebtError,
    DebtsActions.createMultipleDebtError,
    DebtsActions.createSingleDebtError,
    DebtsActions.acceptMultipleDebtCreationError,
    DebtsActions.declineMultipleDebtCreationError,
    DebtsActions.acceptAllOperationsError,
    DebtsActions.acceptUserDeletedFromDebtError,
    DebtsActions.connectUserToDebtError,
    DebtsActions.connectUserToDebtAcceptError,
    DebtsActions.connectUserToDebtDeclineError,
  ];

  constructor(
    private actions$: Actions,
    private debtsService: DebtsService,
    private snackbar: MatSnackBar,
    private dialogService: DialogService,
    private router: Router
  ) {}

  @Effect()
  loadDebts$ = this.actions$.pipe(
    ofType(DebtsActions.loadDebts),
    mergeMap(() => this.debtsService.getDebtsList().pipe(
      map(list => DebtsActions.loadDebtsSuccess(list)),
      catchError(err => of(DebtsActions.loadDebtsError(err)))
    ))
  );

  @Effect()
  loadDebt$ = this.actions$.pipe(
    ofType(DebtsActions.loadDebt),
    mergeMap(({id}) => this.debtsService.getDebt(id).pipe(
      map((debt) => DebtsActions.loadDebtSuccess({debt})),
      catchError(err => of(DebtsActions.loadDebtError(err)))
    ))
  );

  @Effect()
  deleteDebtRequest$ = this.actions$.pipe(
    ofType(DebtsActions.deleteDebtRequest),
    mergeMap(({debt}) => this.dialogService.showDeleteDialog('Delete this debt?').pipe(
      first(),
      map(del => {
        if (del) {
          this.router.navigate(['/']);
          return DebtsActions.deleteDebt({debt});
        }
        return DebtsActions.deleteDebtRequestRejected();
      }),
    ))
  );

  @Effect()
  deleteDebt$ = this.actions$.pipe(
    ofType(DebtsActions.deleteDebt),
    mergeMap(({debt}) => this.debtsService.deleteDebt(debt.id).pipe(
      map(() => DebtsActions.deleteDebtSuccess()),
      catchError(err => of(DebtsActions.deleteDebtError({
        error: err,
        debt
      })))
    ))
  );

  @Effect()
  createMultipleDebt$ = this.actions$.pipe(
    ofType(DebtsActions.createMultipleDebt),
    mergeMap(dto => this.debtsService.createMultipleDebt(dto).pipe(
      map(debt => {
        this.router.navigate([`/${debt.id}`]);
        return DebtsActions.createMultipleDebtSuccess({debt});
      }),
      catchError(err => of(DebtsActions.createMultipleDebtError(err)))
    ))
  );

  @Effect()
  createSingleDebt$ = this.actions$.pipe(
    ofType(DebtsActions.createSingleDebt),
    mergeMap(dto => this.debtsService.createSingleDebt(dto).pipe(
      map(debt => {
        this.router.navigate([`/${debt.id}`]);
        return DebtsActions.createSingleDebtSuccess({debt});
      }),
      catchError(err => of(DebtsActions.createSingleDebtError(err)))
    ))
  );

  @Effect()
  acceptMultipleDebtCreation$ = this.actions$.pipe(
    ofType(DebtsActions.acceptMultipleDebtCreation),
    mergeMap(({id}) => this.debtsService.acceptMultipleDebtCreation(id).pipe(
      map(debt => DebtsActions.acceptMultipleDebtCreationSuccess({debt})),
      catchError(err => of(DebtsActions.acceptMultipleDebtCreationError(err)))
    ))
  );

  @Effect()
  declineMultipleDebtCreation$ = this.actions$.pipe(
    ofType(DebtsActions.declineMultipleDebtCreation),
    mergeMap(({id}) => this.debtsService.declineMultipleDebtCreation(id).pipe(
      map(() => DebtsActions.declineMultipleDebtCreationSuccess({id})),
      catchError(err => of(DebtsActions.declineMultipleDebtCreationError(err)))
    ))
  );

  @Effect()
  acceptAllOperations$ = this.actions$.pipe(
    ofType(DebtsActions.acceptAllOperations),
    mergeMap(({id}) => this.debtsService.acceptAllOperations(id).pipe(
      map(debt => DebtsActions.acceptAllOperationsSuccess({debt})),
      catchError(err => of(DebtsActions.acceptAllOperationsError(err)))
    ))
  );

  @Effect()
  acceptUserDeletedFromDebt$ = this.actions$.pipe(
    ofType(DebtsActions.acceptUserDeletedFromDebt),
    mergeMap(({id}) => this.debtsService.acceptUserDeletedFromDebt(id).pipe(
      map(debt => DebtsActions.acceptUserDeletedFromDebtSuccess({debt})),
      catchError(err => of(DebtsActions.acceptUserDeletedFromDebtError(err)))
    ))
  );

  @Effect()
  connectUserToDebt$ = this.actions$.pipe(
    ofType(DebtsActions.connectUserToDebt),
    mergeMap(({id, userId}) => this.debtsService.connectUserToSingleDebt(id, userId).pipe(
      map(debt => DebtsActions.connectUserToDebtSuccess({debt})),
      catchError(err => of(DebtsActions.connectUserToDebtError(err)))
    ))
  );

  @Effect()
  acceptConnectUserToDebt$ = this.actions$.pipe(
    ofType(DebtsActions.connectUserToDebtAccept),
    mergeMap(({id}) => this.debtsService.acceptUserConnecting(id).pipe(
      map(debt => DebtsActions.connectUserToDebtAcceptSuccess({debt})),
      catchError(err => of(DebtsActions.connectUserToDebtError(err)))
    ))
  );

  @Effect()
  declineConnectUserToDebt$ = this.actions$.pipe(
    ofType(DebtsActions.connectUserToDebtDecline),
    mergeMap(({id}) => this.debtsService.declineUserConnecting(id).pipe(
      map(() => DebtsActions.connectUserToDebtDeclineSuccess({id})),
      catchError(err => of(DebtsActions.connectUserToDebtDeclineError(err)))
    ))
  );

  @Effect({ dispatch: false })
  showError$ = this.actions$.pipe(
    ofType(...this.errorActions),
    tap(({error}) => ErrorSnackbarHelper.showErrorSnackbar(this.snackbar, error))
  );

}
