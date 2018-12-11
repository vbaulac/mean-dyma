import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public form: FormGroup;
  public error: string;

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  public submit():void {
    this.auth.signin(this.form.value).subscribe( () => {
      this.router.navigate(['/'])
    },
    err => {
      this.error = err.error;
    });
  }

}
