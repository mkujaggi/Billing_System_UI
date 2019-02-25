import * as AuthActions from './auth.actions';

export interface State {
    token: string;
    authenticated: boolean;
    errorMessage: string;
}

const initialState: State = {
    token: null,
    authenticated: false,
    errorMessage: null
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case (AuthActions.SIGNIN):
            return {
                ...state,
                authenticated: true,
                errorMessage: null
            };
        case (AuthActions.LOGOUT):
            return {
                ...state,
                token: null,
                authenticated: false
            };
        case (AuthActions.SET_TOKEN):
            return {
                ...state,
                token: action.payload
            };
        case (AuthActions.LOGINFAIL):
            return {
                ...state,
                errorMessage: action.payload
            };
        case (AuthActions.LOGOUT):
            return initialState;
        default:
            const authToken = localStorage.getItem('token');
            if (authToken) {
                state.token = authToken;
                state.authenticated = true;
                return state;
            }
            return state;
    }
}
