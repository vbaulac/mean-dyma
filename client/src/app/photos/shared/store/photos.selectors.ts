import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PhotosState } from "./photos.reducers";

export const photosSelector = createFeatureSelector('photos');

export const filterSelector = createSelector(photosSelector, (photosState: PhotosState) => {
    if (photosState) {
        return photosState.filter;
    } else {
        return null;
    }
});