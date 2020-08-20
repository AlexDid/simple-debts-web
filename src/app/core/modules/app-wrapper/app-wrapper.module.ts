import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppWrapperComponent } from './app-wrapper.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './header/header.component';
import { OutsideButtonComponent } from './outside-button/outside-button.component';
import { DebtTitleComponent } from './header/debt-title/debt-title.component';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [AppWrapperComponent, HeaderComponent, OutsideButtonComponent, DebtTitleComponent],
  exports: [
    AppWrapperComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class AppWrapperModule { }
