import { DebtAccountType } from './debt-account-type.enum';
import { DebtStatus } from './debt-status.enum';
import { Operation } from './operation';
import { Type } from 'class-transformer';
import { MoneyStatus } from './money-status.enum';
import { User } from '../../../../core/models';

export class Debt {
  readonly id: string;
  readonly user: User;
  readonly type: DebtAccountType;
  readonly currency: string;
  readonly status: DebtStatus;
  readonly statusAcceptor: string;
  readonly summary: number;
  readonly moneyReceiver: string;

  @Type(() => Operation)
  readonly moneyOperations: Operation[];

  get moneyStatus(): MoneyStatus {
    switch (this.moneyReceiver) {
      case null: return MoneyStatus.NONE;
      case this.user.id: return MoneyStatus.GIVEN;
      default: return MoneyStatus.TAKEN;
    }
  }

  get isUserStatusAcceptor(): boolean {
    return this.statusAcceptor !== this.user.id;
  }

  get unacceptedOperationsAmount(): number {
    return this.moneyOperations !== null
      ? this.moneyOperations.reduce((sum, operation) => sum += (operation.isUnaccepted(this.user.id) ? 1 : 0), 0)
      : 0;
  }

  get hasUnacceptedOperations(): boolean {
    return this.unacceptedOperationsAmount > 0;
  }

  get isUserConnectAllowed(): boolean {
    return this.type === DebtAccountType.SINGLE_USER && this.status !== DebtStatus.CONNECT_USER && this.status !== DebtStatus.USER_DELETED;
  }
}
