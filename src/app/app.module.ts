import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { CoreModule } from './core/core.module';
import { appEffects, appReducer } from './store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterStoreModule } from './core/modules/router';
import { SocialLoginModule } from 'angularx-social-login';
import { provideConfig } from './auth/config';

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useFactory: provideConfig
    }
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SocialLoginModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot(appEffects),
    RouterStoreModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
