import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PasswordValidators } from 'src/app/validators/password-validators';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
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
    console.log(this.form.value);
  }
}
