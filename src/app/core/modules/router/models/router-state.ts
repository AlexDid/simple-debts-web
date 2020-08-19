import { Params } from '@angular/router';
import { RouterReducerState } from '@ngrx/router-store';
import { AppWrapperConfig } from './app-wrapper-config';

export interface RouterState {
  url: string;
  queryParams: Params;
  params: Params;
  data: AppWrapperConfig;
}

export type MergedRouteReducerState = RouterReducerState<RouterState>;
