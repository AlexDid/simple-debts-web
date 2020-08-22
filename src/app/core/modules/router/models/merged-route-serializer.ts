import { RouterStateSerializer } from '@ngrx/router-store';
import { ActivatedRouteSnapshot, Data, Params, RouterStateSnapshot } from '@angular/router';
import { RouterState } from './router-state';


export class MergedRouterStateSerializer implements RouterStateSerializer<RouterState> {
  serialize(routerState: RouterStateSnapshot): RouterState {
    return {
      url: routerState.url,
      params: this.mergeRouteParams(routerState.root, r => r.params),
      queryParams: this.mergeRouteParams(routerState.root, r => r.queryParams),
      data: this.mergeRouteData(routerState.root),
    };
  }

  private mergeRouteParams(route: ActivatedRouteSnapshot, getter: (r: ActivatedRouteSnapshot) => Params): Params {
    if (!route) {
      return {};
    }
    const currentParams = getter(route);
    const primaryChild = route.children.find(c => c.outlet === 'primary') || route.firstChild;
    return {...currentParams, ...this.mergeRouteParams(primaryChild, getter)};
  }

  private mergeRouteData(route: ActivatedRouteSnapshot): Data {
    if (!route) {
      return {};
    }

    const currentData = route.data;
    const primaryChild = route.children.find(c => c.outlet === 'primary') || route.firstChild;
    return {...currentData, ...this.mergeRouteData(primaryChild)};
  }
}
