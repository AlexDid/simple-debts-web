import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as ControlsActions from './controls.actions';
import { map, mergeMap, take } from 'rxjs/operators';
import { concat, of } from 'rxjs';

@Injectable()
export class ControlsEffects {

  constructor(
    private actions$: Actions
  ) {}

  @Effect()
  refresh$ = this.actions$.pipe(
    ofType(ControlsActions.refresh),
    mergeMap(actions => concat(
      of(actions.action),
      this.actions$.pipe(
        ofType(actions.completeAction, actions.errorAction),
        map(() => ControlsActions.refreshCompleted()),
        take(1)
      )
    ))
  );

}
