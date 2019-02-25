import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducers';
import * as fromApp from '../../app/store/app.reducers';
import * as OrderActions from '../order/store/order.actions';
import * as AuthAction from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;
  hasAccess = false;
  constructor(private store: Store<fromApp.AppState>) { }
  ngOnInit() {
    this.authState = this.store.select('auth');
    const userType = localStorage.getItem('access');
    if (userType === 'Employee') {
      console.log('hasAccess', userType);
      this.hasAccess = true;
    }
    console.log('NoAccess', userType);
  }
  onSearchOrder() {
    this.store.dispatch(new OrderActions.FetchOrder());
  }
  onLogout() {
    this.store.dispatch(new AuthAction.Logout());
  }
  onCreateOrder() {
    this.store.dispatch(new OrderActions.FetchRateList());
  }
}
