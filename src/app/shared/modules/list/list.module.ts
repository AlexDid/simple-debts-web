import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [ListComponent, ListItemComponent],
  exports: [ListComponent, ListItemComponent],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class ListModule { }
