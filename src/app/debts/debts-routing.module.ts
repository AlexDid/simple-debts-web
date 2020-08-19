import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DebtsComponent } from './debts.component';
import { DebtsListComponent } from './debts-list/debts-list.component';
import { DebtsDetailsComponent } from './debts-details/debts-details.component';
import { debtIdRouteParam } from '../store/debts/debts.selectors';
import { AppWrapperConfig } from '../core/modules/router';

const routes: Routes = [
  {
    path: '',
    component: DebtsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: DebtsListComponent,
        data: {
          refresh: true
        } as AppWrapperConfig
      },
      {
        path: `:${debtIdRouteParam}`,
        component: DebtsDetailsComponent,
        data: {
          back: true,
          refresh: true
        } as AppWrapperConfig
      },
    ],
    data: {
      header: true
    } as AppWrapperConfig
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DebtsRoutingModule { }
