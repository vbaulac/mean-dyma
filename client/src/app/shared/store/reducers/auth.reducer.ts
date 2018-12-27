import { User } from "../../models/user.model";
import { AuthActions, SIGNUP_ERROR, SIGNIN_ERROR, SIGNIN_SUCCESS } from "../actions/auth.action";

export interface AuthState {
    user: User;
    token: string;
    error: string;
    isLoggedin: boolean;
}

export function authReducer(state: AuthState, action: AuthActions): AuthState {
    switch (action.type) {
        case SIGNIN_ERROR :
        case SIGNUP_ERROR : {
            return {
                ...state,
                isLoggedin: false,
                error: action.payload
            };
        }
        case SIGNIN_SUCCESS : {
            return {
                ...state,
                token: action.payload,
                isLoggedin: true,
                error: null
            };
        }
    }
    return state;
}