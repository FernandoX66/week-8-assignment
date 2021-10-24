import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  get email(): AbstractControl {
    return this.form.get('email') as AbstractControl;
  }

  get password(): AbstractControl {
    return this.form.get('password') as AbstractControl;
  }

  login(): void {
    const userToLogin = {
      email: this.email.value,
      password: this.password.value,
    };

    this.authService.logIn(userToLogin).subscribe(
      (response: boolean) => {
        if (response) {
          this.router.navigate(['home']);
        }
      },
      (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.form.setErrors({ unauthorized: true });
        } else {
          alert(error);
        }
      }
    );
  }
}
