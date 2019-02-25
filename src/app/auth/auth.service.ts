import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../shared/models/login.modal';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};
@Injectable()
export class AuthService {
    token: string;
    constructor(private router: Router,
            private http: HttpClient) {
    }
    signinUser(username: string, password: string) {
        const body = {
            username: username,
            password: password
        };
        this.http.post<Login>('http://localhost:3000/users/login', body, {observe: 'response'})
        .subscribe(
            response => {
                const keys = response.headers.keys();
                const headers = keys.map(key =>
                    `${key}: ${response.headers.get(key)}`);
                console.log('headers', headers);
                console.log('token Ser: ', response.body.tokens[0].token.toString());
                return response.body.tokens[0].token.toString();
            }
        );
    }
}
