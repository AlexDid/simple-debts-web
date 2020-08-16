import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DebtsRoutingModule } from './debts-routing.module';
import { DebtsListComponent } from './debts-list/debts-list.component';
import { DebtsListItemComponent } from './debts-list/debts-list-item/debts-list-item.component';
import { DebtsDetailsComponent } from './debts-details/debts-details.component';
import { HeaderModule } from '../core/modules/header/header.module';
import { DebtsComponent } from './debts.component';
import { DebtsService } from './services/debts.service';


@NgModule({
  declarations: [DebtsListComponent, DebtsListItemComponent, DebtsDetailsComponent, DebtsComponent],
  providers: [
    DebtsService
  ],
  imports: [
    CommonModule,
    DebtsRoutingModule,
    HeaderModule
  ]
})
export class DebtsModule { }
