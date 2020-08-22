import { Component, Input } from '@angular/core';
import { Operation, OperationStatus } from '../../../store/debts/models';
import { AppState } from '../../../store';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, of } from 'rxjs';
import { selectShowCanceledOperations } from '../../../store/controls/controls.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-operations-list',
  templateUrl: './operations-list.component.html',
  styleUrls: ['./operations-list.component.scss']
})
export class OperationsListComponent {

  @Input()
  operations: Operation[];

  @Input()
  userId: string;

  @Input()
  debtId: string;

  constructor(
    private store: Store<AppState>
  ) {}

  get operations$(): Observable<Operation[]> {
    return combineLatest([
      of(this.operations),
      this.store.select(selectShowCanceledOperations)
    ]).pipe(
      map(([operations, showCanceled]) => showCanceled || !operations?.length
        ? operations
        : operations.filter(operation => operation.status === OperationStatus.UNCHANGED)
      )
    );
  }

}
