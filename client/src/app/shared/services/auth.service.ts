import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, timer, of, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { JwtToken } from '../models/jwt-token.model';
import { tap, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public subscriptionTimer: Subscription;

  public jwtToken: BehaviorSubject<JwtToken> = new BehaviorSubject({
    isAuthenticated: null,
    token: null
  });

  constructor(private http: HttpClient, private router: Router) {
    this.initToken();
    this.subscriptionTimer = this.initTimer();
  }
  
  public initTimer() {
    return timer(2000, 5000).pipe(
      switchMap( () => {
        console.log('try get token');
        if (localStorage.getItem('jwt')) {
           return this.http.get<string>('/api/auth/refresh-token').pipe(
            tap( (token: string) => {
              this.jwtToken.next({
                isAuthenticated: true,
                token: token
              });
              localStorage.setItem('jwt', token);
            })
          )
        } else {
          this.subscriptionTimer.unsubscribe();
          return of(null);          
        }        
      })
    ).subscribe(() => {}, err => {
      // en cas d'erreur en essayant de redresh le token, on set l'utilisateur a délogué, on remove le token du local storage, et on se desabonne du timer
      this.jwtToken.next({
        isAuthenticated: false,
        token: null
      });

      localStorage.removeItem('jwt');
      this.subscriptionTimer.unsubscribe();
    });
  }

  private initToken(): void {
    const token = localStorage.getItem('jwt');
    if (token) {
      this.jwtToken.next({
        isAuthenticated: true,
        token: token
      });      
    } else {
      this.jwtToken.next({
        isAuthenticated: false,
        token: null
      });
    }    
  }

  public signup(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/signup', user);
  }

  public signin(credentials: {email: string, password: string}): Observable<string> {
    return this.http.post<string>('api/auth/signin', credentials).pipe(
      tap( (token:string) => {
        this.jwtToken.next({
          isAuthenticated: true,
          token: token
        });
        localStorage.setItem('jwt', token)
        this.subscriptionTimer = this.initTimer();
        this.router.navigate(['/profile']);
      })
    );
  }

  public logout(): void {
    this.jwtToken.next({
      isAuthenticated: false,
      token: null
    });

    localStorage.removeItem('jwt');

    this.router.navigate(['/signin']);
  }
}
