import { Currency } from './models';
import { Action, createReducer, on } from '@ngrx/store';
import * as CommonActions from './common.actions';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export const commonFeatureKey = 'common';

export interface CurrenciesState extends EntityState<Currency> {}

export interface CommonState {
  currencies: CurrenciesState;
}

export const adapter = createEntityAdapter<Currency>({
  selectId: currency => currency.currency,
  sortComparer: (a, b) => a.currency.localeCompare(b.currency)
});

export const initialState: CommonState = {
  currencies: adapter.getInitialState()
};

export const reducer = createReducer(
  initialState,

  on(CommonActions.loadCurrenciesSuccess, (state, {currencies}) => ({
    ...state,
    currencies: adapter.setAll(currencies, state.currencies)
  })),
);

export function commonReducer(state: CommonState | undefined, action: Action): CommonState {
  return reducer(state, action);
}
