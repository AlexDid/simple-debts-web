import { MonoTypeOperatorFunction, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, OnDestroy } from '@angular/core';

@Component({
  template: ''
})
export abstract class SubscriptionComponent implements OnDestroy {
  private unsubscribe$ = new Subject();

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  getTakeUntilPipe<T>(): MonoTypeOperatorFunction<T> {
    return takeUntil(this.unsubscribe$);
  }

  unsubscribe(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
