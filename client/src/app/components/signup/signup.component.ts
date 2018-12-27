import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { MyAppState } from 'src/app/shared/store';
import { TrySignup } from 'src/app/shared/store/actions/auth.action';
import { errorAuthSelector } from 'src/app/shared/store/selectors/auth.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public form: FormGroup;
  public error$: Observable<string>;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private store: Store<MyAppState>) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [''],
      name: [''],
      password: ['']
    });

    this.error$ = this.store.pipe(
      select(errorAuthSelector)
    );
  }

  public submit():void {
    this.store.dispatch(new TrySignup(this.form.value));

    // this.authService.signup(this.form.value).subscribe( (user: User) => {
    //   this.router.navigate(['/signin']);
    // });
    // // console.log(this.form)
  }

}
