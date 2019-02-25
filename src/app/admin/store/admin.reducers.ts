import * as AdminActions from './admin.actions';
import * as fromApp from '../../store/app.reducers';
import { Login } from '../../shared/models/login.modal';
import { Order } from '../../shared/models/order.modal';
export interface State {
    user: Login;
    users: Login[];
}
const initialState: State = {
    user: null,
    users: []
};

export function adminReducer(state = initialState, action: AdminActions.AdminActions) {
    switch (action.type) {
        case (AdminActions.CREATE_USER):
            return {
                ...state,
                user: state.user
            };
        case (AdminActions.USERNAME_AVAIL):
            return {
                ...state,
                username: action.payload
            };
        case (AdminActions.SET_USERS):
            return {
                ...state,
                users: action.payload
            };
        default:
            return state;
    }
}
