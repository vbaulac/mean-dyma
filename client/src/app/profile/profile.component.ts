import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';
import { Observable } from 'rxjs';
import { MyAppState } from '../shared/store';
import { Store, select } from '@ngrx/store';
import { TryFetchCurrentUser } from '../shared/store/actions/auth.action';
import { currentUserSelector } from '../shared/store/selectors/auth.selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public currentUser$: Observable<User>;

  constructor(private store: Store<MyAppState>) { }

  ngOnInit() {
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
    this.store.dispatch(new TryFetchCurrentUser());
  }

}
