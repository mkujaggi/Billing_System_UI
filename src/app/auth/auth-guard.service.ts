import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';
import { take, map } from '../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private store: Store<fromApp.AppState>, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('auth')
    .pipe(take(1),
    map((authState: fromAuth.State) => {
      if (!authState.authenticated) {
        this.router.navigateByUrl('/signin');
      }
      return authState.authenticated;
    })
  );
  }
}
