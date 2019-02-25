import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducers';
import * as fromOrder from '../order/store/order.reducers';
import * as fromAdmin from '../admin/store/admin.reducers';

export interface AppState {
    orderList: fromOrder.State;
    auth: fromAuth.State;
    orders: fromOrder.State;
    rateList: fromOrder.State;
    user: fromAdmin.State;
}
export const reducers: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    orderList: fromOrder.orderReducer,
    orders: fromOrder.orderReducer,
    rateList: fromOrder.orderReducer,
    user: fromAdmin.adminReducer
};
