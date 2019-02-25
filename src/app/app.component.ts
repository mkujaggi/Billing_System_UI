import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromAuth from './auth/store/auth.reducers';
import * as fromApp from './store/app.reducers';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  authState: Observable<fromAuth.State>;
  constructor( private store: Store<fromApp.AppState>) {}
  ngOnInit() {
    this.authState = this.store.select('auth');
    this.isAuthenticated();
  }
  isAuthenticated() {
    this.authState.subscribe(auth => {
      console.log('Authhh:', auth.token);
    });
  }
}
