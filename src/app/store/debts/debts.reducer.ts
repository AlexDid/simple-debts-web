import { Action, createReducer, on } from '@ngrx/store';
import * as DebtsActions from './debts.actions';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Debt } from './models';

export const debtsFeatureKey = 'debts';

export const adapter = createEntityAdapter<Debt>();

export interface DebtsState extends EntityState<Debt> {}

export const initialState: DebtsState = adapter.getInitialState();

export const reducer = createReducer(
  initialState,

  on(DebtsActions.loadDebtsSuccess, (state, {debts}) => adapter.setAll(debts, state)),
  on(DebtsActions.loadDebtSuccess, (state, {debt}) => adapter.upsertOne(debt, state)),
  on(DebtsActions.deleteDebtSuccess, (state, {id}) => adapter.removeOne(id, state)),
  on(DebtsActions.createMultipleDebtSuccess, (state, {debt}) => adapter.addOne(debt, state)),
  on(DebtsActions.createSingleDebtSuccess, (state, {debt}) => adapter.addOne(debt, state)),
  on(DebtsActions.acceptMultipleDebtCreationSuccess, (state, {debt}) => adapter.upsertOne(debt, state)),
  on(DebtsActions.declineMultipleDebtCreationSuccess, (state, {id}) => adapter.removeOne(id, state)),
  on(DebtsActions.acceptAllOperationsSuccess, (state, {debt}) => adapter.upsertOne(debt, state)),
  on(DebtsActions.acceptUserDeletedFromDebtSuccess, (state, {debt}) => adapter.upsertOne(debt, state)),
  on(DebtsActions.connectUserToDebtSuccess, (state, {debt}) => adapter.upsertOne(debt, state)),
  on(DebtsActions.connectUserToDebtAcceptSuccess, (state, {debt}) => adapter.upsertOne(debt, state)),
  on(DebtsActions.connectUserToDebtDeclineSuccess, (state, {id}) => adapter.removeOne(id, state)),

);

export function debtsReducer(state: DebtsState | undefined, action: Action): DebtsState {
  return reducer(state, action);
}
