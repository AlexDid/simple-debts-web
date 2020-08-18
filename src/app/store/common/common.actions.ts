import { createAction, props } from '@ngrx/store';
import { ErrorDto } from '../../core/models';
import { CurrencyListDto } from './models';

export const loadCurrencies = createAction(
  '[Common] Load Currencies'
);
export const loadCurrenciesSuccess = createAction(
  '[Common] Load Currencies Success',
  props<CurrencyListDto>()
);
export const loadCurrenciesError = createAction(
  '[Common] Load Currencies Error',
  props<ErrorDto>()
);
