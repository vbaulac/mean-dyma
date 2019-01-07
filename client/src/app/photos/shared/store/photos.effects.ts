import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { FETCH_PHOTOS } from "./photos.actions";
import { PhotosState } from "./photos.reducers";
import { Store, select } from "@ngrx/store";
import { switchMap, tap, take, debounceTime } from "rxjs/operators";
import { filterSelector } from "./photos.selectors";

@Injectable()
export class PhotosEffects {

    @Effect( { dispatch: false })
    fetchPhotos$ = this.actions$.pipe(
        ofType(FETCH_PHOTOS),
        debounceTime(1000),
        switchMap( () => {
            return this.store.pipe(select(filterSelector), take(1));
        }),
        tap( (filter: string) => {
            console.log('should search with : ', filter);
        })
    )

    constructor(private actions$: Actions,
                private store: Store<PhotosState>) {}
}