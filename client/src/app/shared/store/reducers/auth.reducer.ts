import { User } from "../../models/user.model";
import { Action } from "@ngrx/store";

export interface AuthState {
    user: User;
    token: string;
    error: string;
    isLoggedin: boolean;
}

export function authReducer(state: AuthState, action: Action): AuthState {
    return state;
}