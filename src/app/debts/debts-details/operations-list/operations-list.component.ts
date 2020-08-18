import { Component, Input } from '@angular/core';
import { Operation } from '../../../store/debts/models';

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

}
