import {NgModule, Optional, Self} from '@angular/core';
import { routerReducer, StoreRouterConfig, StoreRouterConnectingModule } from '@ngrx/router-store';
import {StoreModule} from '@ngrx/store';
import {Router} from '@angular/router';
import { MergedRouterStateSerializer } from './models/merged-route-serializer';
import { routerFeatureKey } from '../../../store/router/router.selectors';

export const routerStateConfig: StoreRouterConfig = {
  stateKey: routerFeatureKey,
  serializer: MergedRouterStateSerializer,
};

@NgModule({
  imports: [
    StoreModule.forFeature(routerFeatureKey, routerReducer),
    StoreRouterConnectingModule.forRoot(routerStateConfig),
  ],
  exports: [
    StoreModule,
    StoreRouterConnectingModule
  ],
})
export class RouterStoreModule {

  constructor(@Self() @Optional() router: Router) {
    if (router) {
      console.log('All good, NgrxRouterStoreModule');
    } else {
      console.error('NgrxRouterStoreModule must be imported in the same same level as RouterModule');
    }
  }

}
