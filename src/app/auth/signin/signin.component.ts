import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';
import * as OrderActions from '../../order/store/order.actions';
import { Observable } from '../../../../node_modules/rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  isAuthenticated = false;
  authToken = null;
  errorMessage: string | null;
  getState: Observable<any>;
  constructor( private authService: AuthService, private store: Store<fromApp.AppState>,
              private router: Router) {
    this.getState = this.store.select('auth');
   }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
    const loggedIn = localStorage.getItem('token');
    if (loggedIn !== null || loggedIn !== undefined) {
      this.router.navigate(['/createOrder']);
    }
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new AuthActions.TrySignin({username: email, password: password}));
  }
}
