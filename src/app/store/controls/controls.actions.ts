import { createAction, props } from '@ngrx/store';
import { ActionDto } from './models';

export const refresh = createAction(
  '[Controls] Refresh',
  props<ActionDto>()
);
export const refreshCompleted = createAction(
  '[Controls] Refresh Completed'
);
