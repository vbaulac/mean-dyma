import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../interceptors/auth.interceptor';

// services
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

// guard
import { AuthGuard } from '../guards/auth.guard';

import { LayoutModule } from './layout.module';

// component
import { AppComponent } from 'src/app/app.component';
import { SignupComponent } from 'src/app/components/signup/signup.component';
import { SigninComponent } from 'src/app/components/signin/signin.component';
import { TopbarComponent } from '../components/topbar/topbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const COMPONENTS = [
  SignupComponent,
  SigninComponent,
  TopbarComponent
];

@NgModule({
  declarations: COMPONENTS,
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true // because there are going to be more element added to the providers array after this one
    },
    AuthService, 
    AuthGuard, 
    UserService],
  imports: [
    LayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: COMPONENTS
})
export class CoreModule { }
