import * as OrderActions from './order.actions';
import * as fromApp from '../../store/app.reducers';
import { Order } from '../../shared/models/order.modal';
import { RateList } from '../../shared/models/rate-list.modal';

export interface State {
    orders: Order;
    orderList: Order[];
    rateList: RateList[];
}
export interface OrderState extends fromApp.AppState {
    Order: State;
}
const initialState: State = {
    orders: new Order(),
    orderList: new Array<Order>(),
    rateList: new Array<RateList>()
};

export function orderReducer(state = initialState, action: OrderActions.OrderActions) {
    switch (action.type) {
        case (OrderActions.CREATE_ORDER):
            return {
                ...state,
                order: [state.orders, action.payload]
            };
        case (OrderActions.SET_ORDER):
            return {
                ...state,
                order: action.payload
            };
        case (OrderActions.SET_ORDER_LIST):
            return {
                ...state,
                orderList: action.payload
            };
        case (OrderActions.EDIT_ORDER):
            return {
                ...state,
                order: action.payload
            };
        case (OrderActions.SUBMIT_EDIT_ORDER):
            return {
                ...state,
                order: action.payload
            };
        case (OrderActions.SET_RATE_LIST):
            return {
                ...state,
                rateList: action.payload
            };
        default:
            return state;
    }
}
