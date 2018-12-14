import { Action } from "@ngrx/store";
import { User } from "../../models/user.model";

export const TRY_SIGNUP = '[user] try signup';
export const SIGNUP_SUCCESS = '[user] signup success';
export const SIGNUP_ERROR = '[user] signup error';

export const TRY_SIGNIN = '[user] try signin';
export const SIGNIN_SUCCESS = '[user] signin success';
export const SIGNIN_ERROR = '[user] signin error';

export const TRY_FETCH_CURRENT_USER = '[user] try fetch current user';
export const SET_CURRENT_USER = '[user] set current user';

export class TrySignup implements Action {
    readonly type = TRY_SIGNUP;
    constructor(public payload: User) {}
}