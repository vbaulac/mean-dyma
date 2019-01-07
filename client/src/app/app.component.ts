import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { MyAppState } from './shared/store';
import { Store } from '@ngrx/store';
import { TryRefreshToken } from './shared/store/actions/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  constructor(private store: Store<MyAppState>) {
    this.store.dispatch(new TryRefreshToken());
  }
}
