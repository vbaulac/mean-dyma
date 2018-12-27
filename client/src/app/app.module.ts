import { environment } from 'src/environments/environment.prod';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

// routing
import { APP_ROUTES } from './app.routing';
import { CoreModule } from './shared/modules/core.module';

// ngrx modules
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// ngrx files
import { reducersMap } from './shared/store';
import { AuthEffects } from './shared/store/effects/auth.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    StoreDevtoolsModule,
    BrowserModule,
    CoreModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(APP_ROUTES),
    StoreModule.forRoot(reducersMap),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({
      name: 'Ngrx Photos',
      logOnly: environment.production
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
