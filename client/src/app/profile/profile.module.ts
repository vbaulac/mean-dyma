import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { PROFILE_ROUTES } from './profile.routing';
import { LayoutModule } from '../shared/modules/layout.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    LayoutModule,
    RouterModule.forChild(PROFILE_ROUTES)
  ]
})
export class ProfileModule { }
