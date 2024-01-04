import {AbstractControl, ValidatorFn} from '@angular/forms';

export function StrengthPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    const hasLetters = /[a-zA-Z]/.test(value);
    const hasDigits = /\d/.test(value);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    if (hasLetters && hasDigits && hasSymbols) {
      return null;
    } else if ((hasLetters && hasSymbols) || (hasLetters && hasDigits) || (hasDigits && hasSymbols)) {
      return {'mediumStrength': true};
    } else {
      return {'easyStrength': true};
    }
  };
}
