import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppWrapperComponent } from './app-wrapper.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './header/header.component';
import { OutsideButtonComponent } from './outside-button/outside-button.component';


@NgModule({
  declarations: [AppWrapperComponent, HeaderComponent, OutsideButtonComponent],
  exports: [
    AppWrapperComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class AppWrapperModule { }
