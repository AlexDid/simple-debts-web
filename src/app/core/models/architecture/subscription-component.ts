import { MonoTypeOperatorFunction, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class SubscriptionComponent {
  private unsubscribe$ = new Subject();

  getTakeUntilPipe<T>(): MonoTypeOperatorFunction<T> {
    return takeUntil(this.unsubscribe$);
  }

  unsubscribe(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
