import { AbstractControl, ValidatorFn } from "@angular/forms";

export class CustomValidator {

  static ageLimitValidator(minAge: number, maxAge: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      // if control value is not null and is a number
      if (control.value !== null) {
        // return null  if it's in between the minAge and maxAge and is A valid Number
        return isNaN(control.value) || // checks if its a valid number
        control.value < minAge || // checks if its below the minimum age
          control.value > maxAge // checks if its above the maximum age
          ? { ageLimit: true } // return this incase of error
          : null; // there was not error
      }
      return null;
    };
  }

}
