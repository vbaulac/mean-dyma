import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from './photos.component';
import { LayoutModule } from '../shared/modules/layout.module';
import { RouterModule } from '@angular/router';
import { PHOTOS_ROUTES } from './photos.routing';
import { PhotosService } from './shared/services/photos.service';

@NgModule({
  declarations: [PhotosComponent],
  imports: [
    LayoutModule,
    RouterModule.forChild(PHOTOS_ROUTES)
  ],
  providers: [ PhotosService ]
})
export class PhotosModule { }
