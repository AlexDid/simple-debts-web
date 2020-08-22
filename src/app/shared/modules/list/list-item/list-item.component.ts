import { Component, Input } from '@angular/core';
import { MoneyStatusColor } from '../../../../debts/models';
import { ListItemMessage } from './models';
import { Action, Store } from '@ngrx/store';
import { AppState } from '../../../../store';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {

  @Input()
  pictureBorder = true;

  @Input()
  title: string;

  @Input()
  subtitle: string;

  @Input()
  subtitleColor: MoneyStatusColor = MoneyStatusColor.BLACK;

  @Input()
  messages: ListItemMessage[] = [];

  @Input()
  showSpinner = false;

  constructor(
    private store: Store<AppState>
  ) {}

  dispatchMessageAction(event: MouseEvent, action: Action): void {
    event.preventDefault();
    event.stopPropagation();
    if (action) {
      this.store.dispatch(action);
    }
  }

}
