import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectUserInfo } from './store';
import { loadCurrencies } from './store/common/common.actions';
import { filter } from 'rxjs/operators';
import { IconRegisterService } from './core/services/icon-register.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
    private iconRegister: IconRegisterService
  ) {}

  ngOnInit(): void {
    this.loadCommonData();
    this.registerIcons();
  }

  private loadCommonData(): void {
    this.store.select(selectUserInfo).pipe(
      filter(user => !!user)
    ).subscribe(() => this.store.dispatch(loadCurrencies()));
  }

  private registerIcons(): void {
    this.iconRegister.registerIcons();
  }

}
