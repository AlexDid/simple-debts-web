import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyValueFieldComponent } from './key-value-field.component';


@NgModule({
  declarations: [KeyValueFieldComponent],
  exports: [
    KeyValueFieldComponent
  ],
  imports: [
    CommonModule
  ]
})
export class KeyValueFieldModule { }
