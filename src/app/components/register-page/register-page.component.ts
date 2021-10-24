import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordValidators } from 'src/app/validators/password-validators';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirmation: [
        '',
        [Validators.required, PasswordValidators.mustMatch],
      ],
    });
  }

  ngOnInit(): void {}

  get firstName(): AbstractControl {
    return this.form.get('firstName') as AbstractControl;
  }

  get lastName(): AbstractControl {
    return this.form.get('lastName') as AbstractControl;
  }

  get username(): AbstractControl {
    return this.form.get('username') as AbstractControl;
  }

  get email(): AbstractControl {
    return this.form.get('email') as AbstractControl;
  }

  get password(): AbstractControl {
    return this.form.get('password') as AbstractControl;
  }

  get passwordConfirmation(): AbstractControl {
    return this.form.get('passwordConfirmation') as AbstractControl;
  }

  register(): void {
    let userToRegister = {
      name: `${this.firstName.value} ${this.lastName.value}`,
      email: this.email.value,
      password: this.password.value,
      passwordConfirmation: this.passwordConfirmation.value,
    };

    this.authService.register(userToRegister).subscribe(
      (response: User) => {
        if (response) {
          this.router.navigate(['']);
        }
      },
      (error: HttpErrorResponse) => {
        if (error.status === 400 && error.error.message) {
          for (let errorMessage of error.error.message) {
            if ((errorMessage as string).includes('email')) {
              this.email.setErrors({ emailPattern: true });
            } else if ((errorMessage as string).includes('password')) {
              this.password.setErrors({ passConfLength: true });
            }
          }
        } else {
          alert(error);
        }
      }
    );
  }
}
