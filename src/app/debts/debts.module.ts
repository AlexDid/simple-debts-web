import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DebtsRoutingModule } from './debts-routing.module';
import { DebtsListComponent } from './debts-list/debts-list.component';
import { DebtsListItemComponent } from './debts-list/debts-list-item/debts-list-item.component';
import { DebtsDetailsComponent } from './debts-details/debts-details.component';
import { DebtsComponent } from './debts.component';
import { DebtsService } from '../core/services/debts.service';
import { OperationsListComponent } from './debts-details/operations-list/operations-list.component';
import { OperationListItemComponent } from './debts-details/operations-list/operation-list-item/operation-list-item.component';
import { MatCardModule } from '@angular/material/card';
import { ListModule } from '../shared/modules/list/list.module';
import { MatIconModule } from '@angular/material/icon';
import { AddDebtComponent } from './add-debt/add-debt.component';
import { DebtTypeFormComponent } from './add-debt/debt-type-form/debt-type-form.component';
import { VirtualUserFormComponent } from './add-debt/virtual-user-form/virtual-user-form.component';
import { SelectUserFormComponent } from './add-debt/select-user-form/select-user-form.component';
import { ConfirmScreenComponent } from './add-debt/confirm-screen/confirm-screen.component';
import { CurrencyFormComponent } from './add-debt/currency-form/currency-form.component';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UserSearchModule } from '../shared/modules/user-search/user-search.module';
import { AddOperationComponent } from './debts-details/add-operation/add-operation.component';
import { OperationDetailsComponent } from './debts-details/operation-details/operation-details.component';
import { KeyValueFieldModule } from '../shared/modules/key-value-field/key-value-field.module';


@NgModule({
  declarations: [
    DebtsListComponent,
    DebtsListItemComponent,
    DebtsDetailsComponent,
    DebtsComponent,
    OperationsListComponent,
    OperationListItemComponent,
    AddDebtComponent,
    DebtTypeFormComponent,
    VirtualUserFormComponent,
    SelectUserFormComponent,
    ConfirmScreenComponent,
    CurrencyFormComponent,
    AddOperationComponent,
    OperationDetailsComponent
  ],
  providers: [
    DebtsService
  ],
  imports: [
    CommonModule,
    DebtsRoutingModule,
    ListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    UserSearchModule,
    KeyValueFieldModule
  ]
})
export class DebtsModule { }
