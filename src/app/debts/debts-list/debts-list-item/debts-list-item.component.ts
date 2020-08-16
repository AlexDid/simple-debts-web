import { Component, Input, OnInit } from '@angular/core';
import { Debt } from '../../../store/debts/models';

@Component({
  selector: 'app-debts-list-item',
  templateUrl: './debts-list-item.component.html',
  styleUrls: ['./debts-list-item.component.scss']
})
export class DebtsListItemComponent implements OnInit {

  @Input()
  debt: Debt;

  constructor() { }

  ngOnInit(): void {
  }

}
