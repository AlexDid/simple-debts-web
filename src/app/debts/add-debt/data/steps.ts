import { AddDebtSteps } from '../models';

export const steps: AddDebtSteps[] = [
  AddDebtSteps.SELECT_DEBT_TYPE,
  AddDebtSteps.SELECT_USER,
  AddDebtSteps.SELECT_CURRENCY,
  AddDebtSteps.CONFIRM,
];
