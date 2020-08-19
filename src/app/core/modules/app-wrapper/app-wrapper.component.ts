import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../store';
import { Store } from '@ngrx/store';
import { selectRouteData } from '../../../store/router/router.selectors';
import { AppWrapperConfig } from '../router';
import { SubscriptionComponent } from '../../models';

@Component({
  selector: 'app-app-wrapper',
  templateUrl: './app-wrapper.component.html',
  styleUrls: ['./app-wrapper.component.scss']
})
export class AppWrapperComponent extends SubscriptionComponent implements OnInit {

  config: AppWrapperConfig = {};

  constructor(
    private store: Store<AppState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.getRouteData();
  }

  private getRouteData(): void {
    this.store.select(selectRouteData).pipe(
      this.getTakeUntilPipe()
    ).subscribe(data => this.config = data || {});
  }
}
