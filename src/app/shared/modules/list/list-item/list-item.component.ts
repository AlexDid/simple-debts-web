import { Component, Input } from '@angular/core';
import { MoneyStatusColor } from '../../../../debts/models';
import { ListItemMessage } from './models';

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
  message: ListItemMessage;

}
