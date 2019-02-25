import { Action } from '@ngrx/store';
import { Login } from '../../shared/models/login.modal';
import { Order } from '../../shared/models/order.modal';

export const CREATE_USER = 'CREATE_USER';
export const TRY_CREATE_USER = 'TRY_CREATE_USER';
export const USERNAME_AVAIL = 'USERNAME_AVAIL';
export const SET_USERS = 'SET_USERS';

export class TryCreateUser implements Action {
    readonly type = TRY_CREATE_USER;
    constructor(public payload: Login) {}
}
export class CreateUser implements Action {
    readonly type = CREATE_USER;
}
export class UsernameAvailability implements Action {
    readonly type = USERNAME_AVAIL;
    constructor(public payload: string) {}
}
export class SetUsers implements Action {
    readonly type = SET_USERS;
    constructor(public payload: Login[]) {}
}
export type AdminActions = CreateUser | TryCreateUser | UsernameAvailability | SetUsers;
