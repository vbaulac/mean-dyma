import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { JwtToken } from '../../models/jwt-token.model';
import { Subscription, Observable } from 'rxjs';
import { MyAppState } from '../../store';
import { Store, select } from '@ngrx/store';
import { isLoggedInSelector } from '../../store/selectors/auth.selectors';
import { Logout } from '../../store/actions/auth.action';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  public isLoggedIn$: Observable<boolean>;

  constructor(private store: Store<MyAppState>) { }

  ngOnInit() {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
  }

  public logout(): void {
    this.store.dispatch(new Logout());
  }
}
