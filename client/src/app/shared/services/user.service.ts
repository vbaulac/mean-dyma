import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  public getCurrentUser(): Observable<User> {
      return this.http.get<User>('/api/user/current');
  }
}
