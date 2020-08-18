import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DebtsRoutingModule } from './debts-routing.module';
import { DebtsListComponent } from './debts-list/debts-list.component';
import { DebtsListItemComponent } from './debts-list/debts-list-item/debts-list-item.component';
import { DebtsDetailsComponent } from './debts-details/debts-details.component';
import { HeaderModule } from '../core/modules/header/header.module';
import { DebtsComponent } from './debts.component';
import { DebtsService } from './services/debts.service';
import { OperationsListComponent } from './debts-details/operations-list/operations-list.component';
import { OperationListItemComponent } from './debts-details/operations-list/operation-list-item/operation-list-item.component';
import { MatCardModule } from '@angular/material/card';
import { ListModule } from '../shared/modules/list/list.module';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    DebtsListComponent,
    DebtsListItemComponent,
    DebtsDetailsComponent,
    DebtsComponent,
    OperationsListComponent,
    OperationListItemComponent
  ],
  providers: [
    DebtsService
  ],
  imports: [
    CommonModule,
    DebtsRoutingModule,
    HeaderModule,
    ListModule,
    MatCardModule,
    MatIconModule
  ]
})
export class DebtsModule { }
