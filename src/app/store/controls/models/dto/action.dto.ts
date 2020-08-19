import { Action, ActionCreator } from '@ngrx/store';

export interface ActionDto {
  action: Action;
  completeAction: ActionCreator;
  errorAction: ActionCreator;
}
