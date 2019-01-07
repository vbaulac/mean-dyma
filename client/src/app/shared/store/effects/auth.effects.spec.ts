import { TestBed } from "@angular/core/testing";
import { AuthEffects } from "./auth.effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { Observable, of } from "rxjs";
import { UserService } from "../../services/user.service";
import { StoreModule } from "@ngrx/store";
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from "../../services/auth.service";
import { hot, cold } from 'jasmine-marbles';
import * as AuthActions from '../actions/auth.action';
import { HttpClientModule } from "@angular/common/http";

describe('auth effects', () => {
    let actions: Observable<any>;
    let effects: AuthEffects;
    let fakeAuth;
    
    beforeEach(() => {
        fakeAuth = jasmine.createSpyObj('AuthService', ['signup']);

        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                StoreModule.forRoot({}),
                RouterTestingModule.withRoutes([
                    { path: 'signin', component: {} as any }
                ])
            ],
            providers: [
                AuthEffects,
                provideMockActions(() => actions),
                UserService,
                { provide: AuthService, useValue: fakeAuth }
            ]
        });

        effects = TestBed.get(AuthEffects);
    });

    it('should return empty', () => {
        fakeAuth.signup.and.returnValue(of({ email: 'aa', name: 'aa' }));
        
        actions = hot('---a-', { a: new AuthActions.TrySignup({ email: 'aa', name: 'aa', password: 'aa'})});
        const expected = cold('-----');

        expect(effects.trySignup$).toBe(expected);
    });

    it('should return error', () => {
        fakeAuth.signup.and.throwError('error');

        actions = hot('---a-', { a: new AuthActions.TrySignup({ email: 'aa', name: 'aa', password: 'aa'})});
        const expected = cold('---(b|)', {b:  new AuthActions.SignupError('error') });

        expect(effects.trySignup$).toBe(expected);
    });
    
})