import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { switchMap, take, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private store: Store<fromApp.AppState>, private router: Router) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select('auth')
        .pipe(take(1), switchMap((authState: fromAuth.State) => {
            if (authState.token == null || authState.token === '' || authState.token === undefined) {
                authState.token = localStorage.getItem('token');
                if (authState.token == null || authState.token === '' || authState.token === undefined) {
                    console.log('Intercepted Token:', authState.token);
                    return next.handle(req);
                }
            }
            const dupReq = req.clone({ setHeaders: {
                'x-auth': authState.token,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH'
            }});
            console.log('Intercepted:', dupReq);
            return next.handle(dupReq);
        }));
    }
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
        .pipe(catchError((response: any) => {
            if (response instanceof HttpErrorResponse && (response.status === 401 || response.status === 400)) {
                console.log(response);
            }
            return Observable.throw(response);
        }));
    }
}
