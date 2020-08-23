import { Action, createReducer, on } from '@ngrx/store';
import * as DebtsActions from './debts.actions';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Debt } from './models';

export const debtsFeatureKey = 'debts';

export const adapter = createEntityAdapter<Debt>();

export interface DebtsState extends EntityState<Debt> {
  isLoaded: boolean;
  isSubmittingNewDebt: boolean;
  updatingDebt: string;
  creatingOperation: boolean;
  deletingOperation: string;
  acceptingOperation: string;
}

export const initialState: DebtsState = adapter.getInitialState({
  isLoaded: false,
  isSubmittingNewDebt: false,
  updatingDebt: null,
  creatingOperation: false,
  deletingOperation: null,
  acceptingOperation: null
});

export const reducer = createReducer(
  initialState,

  on(DebtsActions.loadDebtsSuccess, (state, {debts}) => ({
    ...adapter.setAll(debts, state),
    isLoaded: true,
  })),

  on(DebtsActions.createSingleDebt, (state) => ({
    ...state,
    isSubmittingNewDebt: true
  })),

  on(DebtsActions.createMultipleDebt, (state) => ({
    ...state,
    isSubmittingNewDebt: true
  })),

  on(DebtsActions.createMultipleDebtSuccess, (state, {debt}) => ({
    ...adapter.addOne(debt, state),
    isSubmittingNewDebt: false
  })),

  on(DebtsActions.createSingleDebtSuccess, (state, {debt}) => ({
    ...adapter.addOne(debt, state),
    isSubmittingNewDebt: false
  })),

  on(DebtsActions.createMultipleDebtError, (state) => ({
    ...state,
    isSubmittingNewDebt: false
  })),

  on(DebtsActions.createSingleDebtError, (state) => ({
    ...state,
    isSubmittingNewDebt: false
  })),

  on(DebtsActions.acceptMultipleDebtCreation, (state, {id}) => ({
    ...state,
    updatingDebt: id
  })),

  on(DebtsActions.acceptMultipleDebtCreationSuccess, (state) => ({
    ...state,
    updatingDebt: null
  })),

  on(DebtsActions.acceptMultipleDebtCreationError, (state) => ({
    ...state,
    updatingDebt: null
  })),

  on(DebtsActions.declineMultipleDebtCreation, (state, {id}) => ({
    ...state,
    updatingDebt: id
  })),

  on(DebtsActions.declineMultipleDebtCreationSuccess, (state) => ({
    ...state,
    updatingDebt: null
  })),

  on(DebtsActions.declineMultipleDebtCreationError, (state) => ({
    ...state,
    updatingDebt: null
  })),

  on(DebtsActions.addOperation, state => ({
    ...state,
    creatingOperation: true
  })),

  on(DebtsActions.addOperationSuccess, (state, {debt}) => ({
    ...state,
    ...adapter.upsertOne(debt, state),
    creatingOperation: false
  })),

  on(DebtsActions.addOperationError, (state) => ({
    ...state,
    creatingOperation: false
  })),

  on(DebtsActions.deleteOperation, (state, {id}) => ({
    ...state,
    deletingOperation: id
  })),

  on(DebtsActions.deleteOperationSuccess, (state, {debt}) => ({
    ...state,
    ...adapter.upsertOne(debt, state),
    deletingOperation: null
  })),

  on(DebtsActions.deleteOperationError, (state) => ({
    ...state,
    deletingOperation: null
  })),

  on(DebtsActions.acceptOperation, (state, {id}) => ({
    ...state,
    acceptingOperation: id
  })),

  on(DebtsActions.acceptOperationSuccess, (state, {debt}) => ({
    ...state,
    ...adapter.upsertOne(debt, state),
    acceptingOperation: null
  })),

  on(DebtsActions.acceptOperationError, (state) => ({
    ...state,
    acceptingOperation: null
  })),

  on(DebtsActions.declineOperation, (state, {id}) => ({
    ...state,
    acceptingOperation: id
  })),

  on(DebtsActions.declineOperationSuccess, (state, {debt}) => ({
    ...state,
    ...adapter.upsertOne(debt, state),
    acceptingOperation: null
  })),

  on(DebtsActions.declineOperationError, (state) => ({
    ...state,
    acceptingOperation: null
  })),

  on(DebtsActions.loadDebtSuccess, (state, {debt}) => adapter.upsertOne(debt, state)),

  on(DebtsActions.deleteDebt, (state, {debt}) => adapter.removeOne(debt.id, state)),
  on(DebtsActions.deleteDebtError, (state, {debt}) => adapter.upsertOne(debt, state)),
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
