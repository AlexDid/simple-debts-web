import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DebtsComponent } from './debts.component';
import { DebtsListComponent } from './debts-list/debts-list.component';
import { DebtsDetailsComponent } from './debts-details/debts-details.component';
import { debtIdRouteParam, operationIdRouteParam } from '../store/debts/debts.selectors';
import { AppWrapperConfig } from '../core/modules/router';
import { AddDebtComponent } from './add-debt/add-debt.component';
import { AddOperationComponent } from './debts-details/add-operation/add-operation.component';
import { OperationDetailsComponent } from './debts-details/operation-details/operation-details.component';

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
          hideHeaderPicture: true
        } as AppWrapperConfig
      },
      {
        path: `:${debtIdRouteParam}`,
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: DebtsDetailsComponent,
            data: {
              back: true,
              refresh: true,
              deleteDebt: true,
              acceptDebt: true,
              declineDebt: true,
              addOperation: true,
              connectUser: true,
              showAllOperations: true,
            } as AppWrapperConfig
          },
          {
            path: `add-operation`,
            component: AddOperationComponent,
            data: {
              back: true,
            } as AppWrapperConfig
          },
          {
            path: `:${operationIdRouteParam}`,
            component: OperationDetailsComponent,
            data: {
              back: true,
              deleteOperation: true,
              acceptOperation: true,
              declineOperation: true
            } as AppWrapperConfig
          }
        ],
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
