import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

// routing
import { APP_ROUTES } from './app.routing';
import { CoreModule } from './shared/modules/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(APP_ROUTES)    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
