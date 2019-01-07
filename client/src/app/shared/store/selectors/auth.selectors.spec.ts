import * as AuthSelectors from "./auth.selectors";

describe('auth selectors', () => {
    describe('errorAuthSelector', () => {
        it('should return null', () => {
            const mockState = {
                auth: {
                    user: null,
                    token: null,
                    error: null,
                    isLoggedin: null
                }
            };

            expect(AuthSelectors.errorAuthSelector(mockState)).toEqual(null);
        });

        it('should return error', () => {
            const mockState = {
                auth: {
                    user: null,
                    token: null,
                    error: 'error',
                    isLoggedin: null
                }
            };

            expect(AuthSelectors.errorAuthSelector(mockState)).toEqual('error');
        });
    });
});