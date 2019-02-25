import * as AdminActions from './admin.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { Login } from '../../shared/models/login.modal';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Order } from '../../shared/models/order.modal';

@Injectable()
export class AdminEffect {
    constructor(private action$: Actions, private http: HttpClient, private router: Router) {}
    @Effect()
    createUser = this.action$
    .ofType(AdminActions.TRY_CREATE_USER)
    .pipe(map((action: AdminActions.TryCreateUser) => {
        console.log(action.payload);
        return action.payload;
    })
    , switchMap((userData: Login) => {
        console.log(userData, 'userdata');
        return this.http.post<Login>('http://localhost:3000/users', userData, {
            observe: 'body', responseType: 'json'
        });
    })
    , map((resp: JSON) => {
        console.log('response:', resp);
        this.router.navigate(['/adminDash']);
        return [
            {
                type: AdminActions.CREATE_USER
            }
        ];
    }));

    @Effect()
    checkAvailability = this.action$
    .ofType(AdminActions.USERNAME_AVAIL)
    .pipe(map((action: AdminActions.UsernameAvailability) => {
        return action.payload;
    })
    , switchMap((username: string) => {
        console.log(username);
        return this.http.get<Login[]>('http://localhost:3000/users/' + username,
            { observe: 'body', responseType: 'json' });
    })
    , map((users) => {
        console.log(users);
        return {
            type: AdminActions.SET_USERS,
            payload: users
        };
    }));
}
