import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import * as AuthActions from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private store: Store<AppState>
  ) { }


  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

}
