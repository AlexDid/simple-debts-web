import { Component, Input } from '@angular/core';
import { Debt } from '../../../store/debts/models';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { acceptUserDeletedFromDebt } from '../../../store/debts/debts.actions';

@Component({
  selector: 'app-user-deleted-card',
  templateUrl: './user-deleted-card.component.html',
  styleUrls: ['./user-deleted-card.component.scss']
})
export class UserDeletedCardComponent {

  @Input()
  debt: Debt;

  constructor(
    private store: Store<AppState>
  ) {}

  accept(): void {
    this.store.dispatch(acceptUserDeletedFromDebt({ id: this.debt.id }));
  }
}
