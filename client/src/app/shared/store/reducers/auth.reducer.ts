import { User } from "../../models/user.model";
import { AuthActions, SIGNUP_ERROR, SIGNIN_ERROR, SIGNIN_SUCCESS, LOGOUT, SET_CURRENT_USER } from "../actions/auth.action";

export interface AuthState {
    user: User;
    token: string;
    error: string;
    isLoggedin: boolean;
}

const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    error: null,
    isLoggedin: null
};

export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
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
        case LOGOUT : {
            return {
                ...state,
                error: null,
                token: null,
                isLoggedin: false,
                user: null
            };
        }
        case SET_CURRENT_USER : {
            return {
                ...state,
                user: action.payload
            }
        }
    }
    return state;
}