import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';

export class PasswordValidators {
  static mustMatch(control: AbstractControl): ValidationErrors | null {
    const password: AbstractControl = control.root.get(
      'password'
    ) as AbstractControl;
    const passwordConfirmation = control;

    if (!passwordConfirmation.value) {
      return null;
    }

    if (password) {
      const subscription: Subscription = password.valueChanges.subscribe(() => {
        passwordConfirmation.updateValueAndValidity();
        subscription.unsubscribe;
      });
    }

    if (password && password.value !== passwordConfirmation.value) {
      return { mustMatch: true };
    } else {
      return null;
    }
  }
}
