import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CommonService } from '../../core/services/common.service';
import * as CommonActions from './common.actions';
import { catchError, exhaustMap, filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AppState } from '../index';
import { selectCurrencyISOs } from './common.selectors';
import { Currency } from './models';

@Injectable()
export class CommonEffects {

  constructor(
    private actions$: Actions,
    private commonService: CommonService,
    private snackbar: MatSnackBar,
    private store: Store<AppState>
  ) {}

  @Effect()
  loadCurrencies$ = this.actions$.pipe(
    ofType(CommonActions.loadCurrencies),
    // Don't load if we've already loaded.
    withLatestFrom(this.store.select(selectCurrencyISOs)),
    filter(([_, loaded]) => loaded?.length < 1),
    // Don't handle more than one load request at a time.
    exhaustMap(() => this.commonService.getCurrencies().pipe(
      map(this.removeDuplicates),
      map(currencies => CommonActions.loadCurrenciesSuccess({currencies})),
      catchError(error => of(CommonActions.loadCurrenciesError(error)))
    ))
  );

  @Effect()
  showError$ = this.actions$.pipe(
    ofType(CommonActions.loadCurrenciesError),
    tap((error) => this.snackbar.open(error.error, null, {duration: 3000}))
  );

  private removeDuplicates(currencies: Currency[]): Currency[] {
    const ids = currencies.map(currency => currency.currency).filter(id => !!id);
    const setOfIds = Array.from(new Set(ids).keys());
    return setOfIds.map(id => currencies.find(currency => currency.currency === id));
  }

}
