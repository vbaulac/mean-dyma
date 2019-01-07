import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from './photos.component';
import { LayoutModule } from '../shared/modules/layout.module';
import { RouterModule } from '@angular/router';
import { PHOTOS_ROUTES } from './photos.routing';
import { PhotosService } from './shared/services/photos.service';
import { StoreModule } from '@ngrx/store';
import { photosReducer } from './shared/store/photos.reducers';
import { EffectsModule } from '@ngrx/effects';
import { PhotosEffects } from './shared/store/photos.effects';

@NgModule({
  declarations: [PhotosComponent],
  imports: [
    LayoutModule,
    RouterModule.forChild(PHOTOS_ROUTES),
    StoreModule.forFeature('photos', photosReducer),
    EffectsModule.forFeature([ PhotosEffects ])
  ],
  providers: [ PhotosService ]
})
export class PhotosModule { }
