import { ActionReducerMap } from "@ngrx/store";
import { authReducer, AuthState } from "./reducers/auth.reducer";

export interface MyAppState {
    auth: AuthState; // ce auth va contenir toute les info et methods lié a l'authentification
}

export const reducersMap: ActionReducerMap<MyAppState> = {
    auth: authReducer
}