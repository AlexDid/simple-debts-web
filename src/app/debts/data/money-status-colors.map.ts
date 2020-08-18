import { MoneyStatus } from '../../store/debts/models';
import { MoneyStatusColor } from '../models';

export const moneyStatusColorsMap = new Map<MoneyStatus, MoneyStatusColor>([
  [MoneyStatus.TAKEN, MoneyStatusColor.RED],
  [MoneyStatus.GIVEN, MoneyStatusColor.GREEN],
  [MoneyStatus.NONE, MoneyStatusColor.BLACK],
]);
