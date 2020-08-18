import { Component, OnInit } from '@angular/core';
import { loadDebts } from '../store/debts/debts.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../store';

@Component({
  selector: 'app-debts',
  templateUrl: './debts.component.html',
  styleUrls: ['./debts.component.scss']
})
export class DebtsComponent implements OnInit {

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.fetchDebts();
  }

  private fetchDebts(): void {
    this.store.dispatch(loadDebts());
  }
}
