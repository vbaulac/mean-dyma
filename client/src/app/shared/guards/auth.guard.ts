import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { JwtToken } from '../models/jwt-token.model';
import { map, take } from 'rxjs/operators';
import { MyAppState } from '../store';
import { Store, select } from '@ngrx/store';
import { tokenAuthSelector, isLoggedInSelector } from '../store/selectors/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store<MyAppState>, 
              private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.store.pipe(
        take(1),
        select(isLoggedInSelector)
      );  
  }
}
