import { OperationStatus } from './operation-status.enum';
import { MoneyStatus } from './money-status.enum';

export class Operation {
  readonly id: string;
  readonly date: Date;
  readonly status: OperationStatus;
  readonly statusAcceptor: string;
  readonly moneyAmount: number;
  readonly moneyReceiver: string;
  readonly description: string;
  readonly cancelledBy: string;

  getMoneyStatus(userId: string): MoneyStatus {
    switch (this.moneyReceiver) {
      case null: return MoneyStatus.NONE;
      case userId: return MoneyStatus.GIVEN;
      default: return MoneyStatus.TAKEN;
    }
  }

  isUnaccepted(userId: string): boolean {
    return this.status === OperationStatus.CREATION_AWAITING && this.statusAcceptor !== userId;
  }
}
