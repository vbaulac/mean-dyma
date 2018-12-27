import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { TRY_SIGNUP, TrySignup, SignupError, TRY_SIGNIN, TrySignin, SigninError, SigninSuccess, SIGNIN_SUCCESS, TRY_REFRESH_TOKEN } from "../actions/auth.action";
import { map, switchMap, catchError, tap } from "rxjs/operators";
import { AuthService } from "../../services/auth.service";
import { User } from "../../models/user.model";
import { Router } from "@angular/router";
import { empty } from "rxjs/internal/observable/empty";
import { of, Subscription } from "rxjs";

@Injectable()
export class AuthEffects {  

    private subscription: Subscription;

    @Effect()
    trySignup$ = this.actions$.pipe(
        ofType(TRY_SIGNUP),
        map( (action: TrySignup) => action.payload ),
        switchMap( (user: User) => {
            return this.authService.signup(user);
        }),
        switchMap( () => {
            this.router.navigate(['/signin']);
            return empty();
        }),
        catchError( (err: any) => {
            return of(new SignupError(err));
        })
    );

    @Effect()
    trySignin$ = this.actions$.pipe(
        ofType(TRY_SIGNIN),
        map( (action: TrySignin) => action.payload ),
        switchMap( (credentials: { email: string, password: string }) => {
            return this.authService.signin(credentials);
        }),
        map( (token: string) => {
            localStorage.setItem('token', token);
            return new SigninSuccess(token);
        }),
        catchError( (err: any) => {
            return of(new SigninError(err));
        })
    );

    @Effect({ dispatch: false })
    signinSuccess$ = this.actions$.pipe(
        ofType(SIGNIN_SUCCESS),
        tap( () => {
            if (!this.subscription) {
                this.subscription = this.authService.initTimer().subscribe();
            }
        })
    );

    @Effect()
    tryRefreshToken$ = this.actions$.pipe(
        ofType(TRY_REFRESH_TOKEN),
        switchMap(() => {
            return this.authService.refreshToken();
        }),
        map( (token: string) => {
            localStorage.setItem('token', token);
            return new SigninSuccess(token);
        }),
        catchError( (err: any) => {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
            return empty();
        })
    );

    constructor(private actions$: Actions,
                private authService: AuthService,
                private router: Router) { }
}