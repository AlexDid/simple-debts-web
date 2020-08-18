import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store';
import { loadCurrencies } from './store/common/common.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.loadCommonData();
  }

  private loadCommonData(): void {
    this.store.dispatch(loadCurrencies());
  }

}
