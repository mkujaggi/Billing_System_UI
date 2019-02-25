import { Action } from '@ngrx/store';
import { Order } from '../../shared/models/order.modal';
import { RateList } from '../../shared/models/rate-list.modal';

export const CREATE_ORDER = 'CREATE_ORDER';
export const SET_ORDER = 'SET_ORDER';
export const FETCH_ORDER = 'FETCH_ORDER';
export const SET_ORDER_LIST = 'SET_ORDER_LIST';
export const EDIT_ORDER = 'EDIT_ORDER';
export const SUBMIT_EDIT_ORDER = 'SUBMIT_EDIT_ORDER';
export const FETCH_RATE_LIST = 'FETCH_RATE_LIST';
export const SET_RATE_LIST = 'SET_RATE_LIST';

export class CreateOrder implements Action {
    readonly type = CREATE_ORDER;
    constructor(public payload: Order) {}
}
export class SetOrder implements Action {
    readonly type = SET_ORDER;
    constructor(public payload: Order) {}
}
export class FetchOrder implements Action {
    readonly type = FETCH_ORDER;
}
export class SetOrderList implements Action {
    readonly type = SET_ORDER_LIST;
    constructor(public payload: Order[]) { }
}
export class EditOrder implements Action {
    readonly type = EDIT_ORDER;
    constructor(public payload: Order) {}
}
export class SubmitEditOrder implements Action {
    readonly type = SUBMIT_EDIT_ORDER;
    constructor(public payload: Order) { }
}
export class FetchRateList implements Action {
    readonly type = FETCH_RATE_LIST;
}
export class SetRateList implements Action {
    readonly type = SET_RATE_LIST;
    constructor(public payload: RateList[]) { }
}
export type OrderActions = CreateOrder | FetchOrder | SetOrder |
SetOrderList | EditOrder | SubmitEditOrder | FetchRateList | SetRateList;
