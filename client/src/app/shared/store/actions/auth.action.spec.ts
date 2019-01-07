import * as AuthActions from "./auth.action";

describe('auth actions', () => {
    describe('TrySignup action', () => {
        it('should create a try signup action', () => {
            const payload = {
                email: 'a@a.fr',
                name: 'a',
                password: 'a'
            };

            const action = new AuthActions.TrySignup(payload);

            expect( {...action} ).toEqual({
                type: AuthActions.TRY_SIGNUP,
                payload
            });
        })
    });

    describe('SignupError action', () => {
        it('should create a try signup error action', () => {
            const payload = {
                msg: 'error'
            };

            const action = new AuthActions.SignupError(payload);

            expect( {...action} ).toEqual({
                type: AuthActions.SIGNUP_ERROR,
                payload
            });
        })
    });
});

