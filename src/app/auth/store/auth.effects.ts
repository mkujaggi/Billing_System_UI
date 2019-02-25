import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, switchMap, mergeMap, tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import * as AuthActions from './auth.actions';
import { Login } from './../../shared/models/login.modal';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class AuthEffect  {
    constructor(private actions$: Actions,
        private http: HttpClient,
        private router: Router) {
    }
    @Effect()
    authSignin = this.actions$
    .ofType(AuthActions.TRY_SIGNIN)
    .pipe(map((action: AuthActions.TrySignin) => {
        return action.payload;
    })
    , switchMap((authData: { username: string, password: string }) => {
        return this.http.post<Login>('http://localhost:3000/users/login', authData, {
            observe: 'body', responseType: 'json' });
    })
    , map((resp: JSON) => {
        localStorage.setItem('access', resp['userType']);
        console.log(resp['userType']);
        const token = resp['tokens'];
        return token[0]['token'];
    })
    , mergeMap((token: string) => {
        localStorage.setItem('token',  token);
        this.router.navigate(['/createOrder']);
        return [
            {
                type: AuthActions.SIGNIN
            },
            {
                type: AuthActions.SET_TOKEN,
                payload: token
            }
        ];
        })
    , catchError((error) => {
        let errorMsg = '';
        if (error['status'] === 400) {
            errorMsg = 'Login id or password incorrect';
        } else {
            errorMsg = 'Server Error';
        }
        this.router.navigate(['/']);
        return [{
            type: AuthActions.LOGINFAIL,
            payload: errorMsg
        }];
    })
    );


    @Effect({dispatch: false})
    logOut = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        switchMap(() => {
            console.log('deleting');
            return this.http.delete('http://localhost:3000/users/delete', {observe: 'response'});
    })
    , map((res: HttpHeaderResponse) => {
        console.log(res.headers);
        localStorage.removeItem('access');
        localStorage.removeItem('token');
        this.router.navigate(['/']);
        return [
            {
                type: AuthActions.LOGOUT
            },
            {
                type: AuthActions.LOGOUT,
            }
        ];
    })
    , catchError((err) => {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
        return throwError(err);
    })
    );
}
