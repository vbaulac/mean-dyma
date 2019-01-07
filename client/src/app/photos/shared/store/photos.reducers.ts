import { SET_FILTER, PhotosActions } from "./photos.actions";

export interface PhotosState {
    photos: any[];
    filter: string;
}

export function photosReducer(state: PhotosState, action: PhotosActions): PhotosState {
    switch (action.type) {
        case SET_FILTER: {
            return {
                ...state,
                filter: action.payload
            };
        }
    }
    return state;
}