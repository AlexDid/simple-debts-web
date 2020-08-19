import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DebtsComponent } from './debts.component';
import { DebtsListComponent } from './debts-list/debts-list.component';
import { DebtsDetailsComponent } from './debts-details/debts-details.component';
import { debtIdRouteParam } from '../store/debts/debts.selectors';
import { AppWrapperConfig } from '../core/modules/router';
import { AddDebtComponent } from './add-debt/add-debt.component';

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
          refresh: true,
          addDebt: true
        } as AppWrapperConfig
      },
      {
        path: `add-debt`,
        component: AddDebtComponent,
        data: {
          back: true,
        } as AppWrapperConfig
      },
      {
        path: `:${debtIdRouteParam}`,
        component: DebtsDetailsComponent,
        data: {
          back: true,
          refresh: true,
          deleteDebt: true,
          connectUser: true
        } as AppWrapperConfig
      },
    ],
    data: {
      header: true,
      logout: true
    } as AppWrapperConfig
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DebtsRoutingModule { }
