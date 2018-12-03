import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [''],
      nom: [''],
      password: ['']
    })
  }

  public submit():void {
    this.authService.signup(this.form.value).subscribe( (user: User) => {
      this.router.navigate(['/signin']);
    });
    // console.log(this.form)
  }

}
