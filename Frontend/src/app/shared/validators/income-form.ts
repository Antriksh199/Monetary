import { AbstractControl, ValidationErrors } from '@angular/forms';

export function ValueValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const errors: ValidationErrors = {};
  
    if (!value) {
      errors['required'] = " Amount is required";
    } else if (!(/^\d+(\.\d{1,2})?$/.test(value) || value <= 0)) {
      errors['number'] = "Only numbers greater than 0 with up to 2 decimal places allowed.";
    }
  
    return Object.keys(errors).length ? errors : null;
  }

  export function RateValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const errors: ValidationErrors = {};
  
    if (!value) {
      errors['required'] = " Growth Rate is required";
    } else if (!(/^(?:0|[1-9]\d{0,2})(?:\.\d{1,2})?$/.test(value))) {
      errors['invalidRate'] = "Growth Rate is Invalid. Allowed values from 0% to 999.99%";
    }
  
    return Object.keys(errors).length ? errors : null;
  }
  
  export function TenureValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const errors: ValidationErrors = {};
  
    if (!value) {
      errors['required'] = " Tenure is required";
    } else if (!(/^(?:0\.(?:2[5-9]|[3-9][0-9]?)|[1-9]|1[0-9]|2[0-9]|30)(?:\.\d+)?$/.test(value))) {
      errors['invalidTenure'] = "Tenure is invalid. Allowed values from 0 to 30";
    }
  
    return Object.keys(errors).length ? errors : null;
  }

 





































  
