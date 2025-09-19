import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { passwordMatchValidator, UsernameValidator, PasswordValidator } from '../../../shared/validators/auth-validator.js';
import { signUp, confirmSignUp } from 'aws-amplify/auth';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth/auth-service.js';
import { CommonModule } from '@angular/common';
import { IncomeRoutingModule } from "../../../income/income-routing/income-routing-module.js";

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, MatTooltipModule, MatToolbarModule, MatInputModule, MatIconModule,
    MatProgressSpinnerModule, MatFormFieldModule, MatCardModule, MatButtonModule, IncomeRoutingModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {

  step = signal<'signup' | 'confirm' | 'done'>('signup');
  isLoading$ : Observable<boolean>;
  errorMessage = signal<string | null>(null);
  signupForm: FormGroup;
  confirmForm: FormGroup;
  private username: string = '';

  constructor(private fb: FormBuilder, private authServive: AuthService) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, UsernameValidator]],
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      middle_name: [''],
      last_name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      password: ['', [Validators.required, PasswordValidator]],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordMatchValidator });

    this.confirmForm = this.fb.group({
      confirmationCode: ['', Validators.required]
    });

    this.isLoading$ = this.authServive.isLoading$;
  }

  async onSignUp(){
    this.errorMessage.set(null);
    try {
      this.username = this.signupForm.get('username')?.value;
      const { password, email, first_name, middle_name, last_name } = this.signupForm.value;
      await this.authServive.signup(this.username , first_name, last_name,  email, password, middle_name);
      this.step.set('confirm');
    } catch (error: any) {
      this.handleError(error);
    } 
  }

  
  async onConfirmSignUp(): Promise<void> {
    this.errorMessage.set(null);
    try {
      const { confirmationCode } = this.confirmForm.value;
      await this.authServive.confirmSignup(this.username, confirmationCode);
      
      this.step.set('done');
    } catch (error: any) {
      this.handleError(error);
    } finally {
      //this.isLoading.set(false);
    }
  }


  private handleError(error: any): void {
    console.error('Error:', error);
    let message = 'An unexpected error occurred. Please try again.';

    if (error && error.name) {
      switch (error.name) {
        case 'UsernameExistsException':
          message = 'An account with this email already exists. Please sign in or use the forgot password flow.';
          break;
        case 'CodeMismatchException':
          message = 'The code you entered is incorrect. Please try again.';
          break;
        case 'LimitExceededException':
          message = 'Too many attempts. Please try again later.';
          break;
        case 'AliasExistsException':
          message =  'An account with the email already exists.';
          break;
        default:
          message = error.message || message;
          break;
      }
    }
    this.errorMessage.set(message);
  }

}
