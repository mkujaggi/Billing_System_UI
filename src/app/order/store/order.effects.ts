import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import * as OrderActions from './order.actions';
import * as fromAuth from '../../auth/store/auth.reducers';
import { Order } from '../../shared/models/order.modal';
import { RateList } from '../../shared/models/rate-list.modal';

@Injectable()
export class OrderEffects {
    constructor(private action$: Actions,
                private http: HttpClient) {}
    authState: fromAuth.State;
    @Effect()
    orderCreate = this.action$
                .ofType(OrderActions.CREATE_ORDER)
                .pipe(map((action: OrderActions.CreateOrder) => {
                    return action.payload;
                })
            , switchMap((orderData: Order) => {
                return this.http.post('http://localhost:3000/newOrder', orderData, {observe: 'body', responseType: 'json'});
            })
            , map((orders) => {
                return  {
                    type: OrderActions.SET_ORDER,
                    payload: orders
                };
            })
        );
    @Effect()
    orderFetch = this.action$
    .ofType(OrderActions.FETCH_ORDER)
    .pipe(switchMap((action: OrderActions.FetchOrder) => {
        return this.http.get<Order[]>('http://localhost:3000/getAllOrders', { observe: 'body', responseType: 'json' });
    })
    , map((orders) => {
        return {
            type: OrderActions.SET_ORDER_LIST,
            payload: orders
        };
    }));
    @Effect()
    editOrder = this.action$
    .ofType(OrderActions.SUBMIT_EDIT_ORDER)
    .pipe(map((action: OrderActions.SubmitEditOrder) => {
        return action.payload;
    })
    , switchMap((editOrder: Order) => {
        return this.http.patch('http://localhost:3000/orderStatus/' + editOrder.orderId, editOrder,
        { observe: 'body', responseType: 'json'});
    })
    , map((order) => {
        return {
            type: OrderActions.SET_ORDER,
            payload: order
        };
    }));

    @Effect()
    fetchRates = this.action$
    .ofType(OrderActions.FETCH_RATE_LIST)
    .pipe(switchMap(() => {
        return this.http.get<RateList[]>('http://localhost:3000/fetchRateList', { observe: 'body', responseType: 'json' });
    })
    , map((rates) => {
        console.log(rates);
        return {
            type: OrderActions.SET_RATE_LIST,
            payload: rates
        };
    }));
}
