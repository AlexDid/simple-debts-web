import { CurrencyListDto } from './models';
import { Action, createReducer, on } from '@ngrx/store';
import * as CommonActions from './common.actions';

export const commonFeatureKey = 'common';

// tslint:disable-next-line:no-empty-interface
export interface CommonState extends CurrencyListDto {}

export const initialState: CommonState = {
  currencies: []
};

export const reducer = createReducer(
  initialState,

  on(CommonActions.loadCurrenciesSuccess, (state, {currencies}) => ({
    ...state,
    currencies
  })),
);

export function commonReducer(state: CommonState | undefined, action: Action): CommonState {
  return reducer(state, action);
}
