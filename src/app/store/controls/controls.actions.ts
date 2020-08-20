import { createAction, props } from '@ngrx/store';
import { ActionDto, HeaderTextDto } from './models';

export const refresh = createAction(
  '[Controls] Refresh',
  props<ActionDto>()
);
export const refreshCompleted = createAction(
  '[Controls] Refresh Completed'
);

export const setHeaderText = createAction(
  '[Controls] Set Header Text',
  props<HeaderTextDto>()
);

export const resetHeaderText = createAction(
  '[Controls] Reset Header Text'
);
