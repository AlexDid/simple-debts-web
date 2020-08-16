import { OperationStatus } from './operation-status.enum';

export class Operation {
  readonly id: string;
  readonly date: Date;
  readonly status: OperationStatus;
  readonly statusAcceptor: string;
  readonly moneyAmount: number;
  readonly moneyReceiver: string;
  readonly description: string;
  readonly cancelledBy: string;

  isUnaccepted(userId: string): boolean {
    return this.status === OperationStatus.CREATION_AWAITING && this.statusAcceptor !== userId;
  }
}
