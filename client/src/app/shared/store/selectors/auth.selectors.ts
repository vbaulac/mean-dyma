import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../reducers/auth.reducer";

export const authSelector = createFeatureSelector('auth');
export const errorAuthSelector = createSelector(authSelector, 
    (authState: AuthState) => {
        if(authState) {
            return authState.error;
        } else {
            return null;
        }
    }
);

export const tokenAuthSelector = createSelector(authSelector, 
    (authState: AuthState) => {
        if(authState) {
            return authState.token;
        } else {
            return null;
        }
    }
);