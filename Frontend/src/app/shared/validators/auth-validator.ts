import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const passwordControl = control.get('password');
  const confirmPasswordControl = control.get('confirmPassword');

  if (!passwordControl || !confirmPasswordControl) {
      return null;
  }

  // Return null immediately if the controls haven't been touched yet
  if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
      return null;
  }

  if (passwordControl.value !== confirmPasswordControl.value) {
      // If they don't match, set the error on the confirmPassword control
      confirmPasswordControl.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true }; // Return the error on the FormGroup for consistency
  } else {
      // If they match, clear the error from the confirmPassword control
      confirmPasswordControl.setErrors(null);
      return null;
  }  

}
  export function UsernameValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const errors: ValidationErrors = {};
  
    if(value.length < 5 || value.length > 10)
    {
      errors['usernamelength'] = "Username must contain 5 to 10 characters.";
    }
    if (!(/^[a-zA-Z0-9]/.test(value))) {
      errors['invalidUsername'] = "Only characters & numbers are allowed.";
    }
  
    return Object.keys(errors).length ? errors : null;
  }

  export function PasswordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const errors: ValidationErrors = {};
  
    if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(value))) {
      errors['invalidPassword'] = "Invalid Password";
    }
  
    return Object.keys(errors).length ? errors : null;
  }
