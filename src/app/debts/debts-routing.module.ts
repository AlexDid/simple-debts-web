import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DebtsComponent } from './debts.component';
import { DebtsListComponent } from './debts-list/debts-list.component';
import { DebtsDetailsComponent } from './debts-details/debts-details.component';

export const debtIdRouteParam = 'debtId';

const routes: Routes = [
  {
    path: '',
    component: DebtsComponent,
    children: [
      { path: '', pathMatch: 'full', component: DebtsListComponent },
      { path: `:${debtIdRouteParam}`, component: DebtsDetailsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DebtsRoutingModule { }
