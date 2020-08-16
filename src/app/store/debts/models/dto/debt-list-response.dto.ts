import { Debt } from '..';

export interface DebtListResponseDto {
  readonly debts: Debt[];
  readonly summary: {
    toGive: number;
    toTake: number;
  };
}
