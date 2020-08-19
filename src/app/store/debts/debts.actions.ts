import { createAction, props } from '@ngrx/store';
import { ConnectUserToDebtDto, CreateMultipleDebtDto, CreateSingleDebtDto, DebtDto, DebtListResponseDto } from './models';
import { ErrorDto, IdDto } from '../../core/models';

export const loadDebts = createAction(
  '[Debts] Load Debts'
);
export const loadDebtsSuccess = createAction(
  '[Debts] Load Debts Success',
  props<DebtListResponseDto>()
);
export const loadDebtsError = createAction(
  '[Debts] Load Debts Error',
  props<ErrorDto>()
);

export const loadDebt = createAction(
  '[Debts] Load Debt',
  props<IdDto>()
);
export const loadDebtSuccess = createAction(
  '[Debts] Load Debt Success',
  props<DebtDto>()
);
export const loadDebtError = createAction(
  '[Debts] Load Debt Error',
  props<ErrorDto>()
);

export const deleteDebtRequest = createAction(
  '[Debts] Delete Debt Request',
  props<DebtDto>()
);
export const deleteDebtRequestRejected = createAction(
  '[Debts] Delete Debt Request Rejected',
);
export const deleteDebt = createAction(
  '[Debts] Delete Debt',
  props<DebtDto>()
);
export const deleteDebtSuccess = createAction(
  '[Debts] Delete Debt Success',
);
export const deleteDebtError = createAction(
  '[Debts] Delete Debt Error',
  props<ErrorDto & DebtDto>()
);

export const createMultipleDebt = createAction(
  '[Debts] Create Multiple Debt',
  props<CreateMultipleDebtDto>()
);
export const createMultipleDebtSuccess = createAction(
  '[Debts] Create Multiple Debt Success',
  props<DebtDto>()
);
export const createMultipleDebtError = createAction(
  '[Debts] Create Multiple Debt Error',
  props<ErrorDto>()
);

export const createSingleDebt = createAction(
  '[Debts] Create Single Debt',
  props<CreateSingleDebtDto>()
);
export const createSingleDebtSuccess = createAction(
  '[Debts] Create Single Debt Success',
  props<DebtDto>()
);
export const createSingleDebtError = createAction(
  '[Debts] Create Single Debt Error',
  props<ErrorDto>()
);

export const acceptMultipleDebtCreation = createAction(
  '[Debts] Multiple Debt Creation Accept',
  props<IdDto>()
);
export const acceptMultipleDebtCreationSuccess = createAction(
  '[Debts] Multiple Debt Creation Accept Success',
  props<DebtDto>()
);
export const acceptMultipleDebtCreationError = createAction(
  '[Debts] Multiple Debt Creation Accept Error',
  props<ErrorDto>()
);

export const declineMultipleDebtCreation = createAction(
  '[Debts] Multiple Debt Creation Decline',
  props<IdDto>()
);
export const declineMultipleDebtCreationSuccess = createAction(
  '[Debts] Multiple Debt Creation Decline Success',
  props<IdDto>()
);
export const declineMultipleDebtCreationError = createAction(
  '[Debts] Multiple Debt Creation Decline Error',
  props<ErrorDto>()
);

export const acceptAllOperations = createAction(
  '[Debts] Accept All Operations',
  props<IdDto>()
);
export const acceptAllOperationsSuccess = createAction(
  '[Debts] Accept All Operations Success',
  props<DebtDto>()
);
export const acceptAllOperationsError = createAction(
  '[Debts] Accept All Operations Error',
  props<ErrorDto>()
);

export const acceptUserDeletedFromDebt = createAction(
  '[Debts] Accept User Deleted From Debt',
  props<IdDto>()
);
export const acceptUserDeletedFromDebtSuccess = createAction(
  '[Debts] Accept User Deleted From Debt Success',
  props<DebtDto>()
);
export const acceptUserDeletedFromDebtError = createAction(
  '[Debts] Accept User Deleted From Debt Error',
  props<ErrorDto>()
);

export const connectUserToDebt = createAction(
  '[Debts] Connect User To Debt',
  props<ConnectUserToDebtDto>()
);
export const connectUserToDebtSuccess = createAction(
  '[Debts] Connect User To Debt Success',
  props<DebtDto>()
);
export const connectUserToDebtError = createAction(
  '[Debts] Connect User To Debt Error',
  props<ErrorDto>()
);

export const connectUserToDebtAccept = createAction(
  '[Debts] Connect User To Debt Accept',
  props<IdDto>()
);
export const connectUserToDebtAcceptSuccess = createAction(
  '[Debts] Connect User To Debt Accept Success',
  props<DebtDto>()
);
export const connectUserToDebtAcceptError = createAction(
  '[Debts] Connect User To Debt Accept Error',
  props<ErrorDto>()
);

export const connectUserToDebtDecline = createAction(
  '[Debts] Connect User To Debt Decline',
  props<IdDto>()
);
export const connectUserToDebtDeclineSuccess = createAction(
  '[Debts] Connect User To Debt Decline Success',
  props<IdDto>()
);
export const connectUserToDebtDeclineError = createAction(
  '[Debts] Connect User To Debt Decline Error',
  props<ErrorDto>()
);
