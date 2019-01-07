import * as AuthReducer from "./auth.reducer";
import * as AuthActions from '../actions/auth.action';

describe('auth reducer', () => {
    it('should return initial state', () => {
        const { initialState } = AuthReducer; // deconstruction (equal to const initialState = AuthReducer.initialState)
        const action = {} as any;

        expect(AuthReducer.authReducer(undefined, action)).toEqual(initialState);
    });

    it('should return an error', () => {
        const { initialState } = AuthReducer;
        const action = new AuthActions.SignupError('error');

        const state = AuthReducer.authReducer(initialState, action);

        expect(state.error).toEqual('error');
    });

});