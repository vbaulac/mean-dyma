import { Component, OnInit } from '@angular/core';
import { PhotosState } from './shared/store/photos.reducers';
import { Store, select } from '@ngrx/store';
import { Photo } from './shared/models/photo.model';
import { Observable } from 'rxjs';
import { photosResultSelector } from './shared/store/photos.selectors';
import { SwUpdate } from '@angular/service-worker';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  public photos$: Observable<Photo[]>;

  constructor(private store: Store<PhotosState>,
              private swUpdate: SwUpdate) { 
    this.swUpdate.available.subscribe( (version) => {
      console.log({version});
      if (version) {
       this.swUpdate.activateUpdate().then(() => {
        window.location.reload();
       });
      }
    });

    this.swUpdate.checkForUpdate();
  }

  ngOnInit() {
    this.photos$ = this.store.pipe(select(photosResultSelector));
    this.photos$.subscribe( res => {
      console.log(res);
    })
  }

}
