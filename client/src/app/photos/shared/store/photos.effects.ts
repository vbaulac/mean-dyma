import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { FETCH_PHOTOS, FetchPhotosSuccess } from "./photos.actions";
import { PhotosState } from "./photos.reducers";
import { Store, select } from "@ngrx/store";
import { switchMap, tap, take, debounceTime, map } from "rxjs/operators";
import { filterSelector } from "./photos.selectors";
import { PhotosService } from "../services/photos.service";
import { Photo } from "../models/photo.model";

@Injectable()
export class PhotosEffects {

    @Effect()
    fetchPhotos$ = this.actions$.pipe(
        ofType(FETCH_PHOTOS),
        debounceTime(1000),
        switchMap( () => {
            return this.store.pipe(select(filterSelector), take(1));
        }),
        switchMap( (filter: string) => {
            return this.photosService.getPictures(filter);
        }),
        map( (photos: Photo[]) => {
            return new FetchPhotosSuccess(photos);
        })
    )

    constructor(private actions$: Actions,
                private store: Store<PhotosState>,
                private photosService: PhotosService) {}
}