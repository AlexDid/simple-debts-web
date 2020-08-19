import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { MatIconModule } from '@angular/material/icon';
import { EmptyListComponent } from './empty-list/empty-list.component';
import { SpinnerContainerComponent } from './spinner-container/spinner-container.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [ListComponent, ListItemComponent, EmptyListComponent, SpinnerContainerComponent],
  exports: [ListComponent, ListItemComponent, EmptyListComponent, SpinnerContainerComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class ListModule { }
