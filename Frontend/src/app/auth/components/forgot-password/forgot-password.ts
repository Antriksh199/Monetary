
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { resetPassword, confirmResetPassword } from 'aws-amplify/auth';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth-service.js';
import { PasswordValidator, passwordMatchValidator } from '../../../shared/validators/auth-validator.js';
import { MatInputModule } from '@angular/material/input';
import { UsernameValidator } from '../../../shared/validators/auth-validator.js';
import { IncomeRoutingModule } from "../../../income/income-routing/income-routing-module.js";

@Component({
  selector: 'app-forgot-password',
  imports: [MatFormFieldModule, MatCardModule, MatButtonModule, MatInputModule, MatTooltipModule, MatProgressSpinnerModule, MatIconModule, ReactiveFormsModule, IncomeRoutingModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword {

  step: 'start' | 'confirm' | 'done' = 'start';
  isLoading = false;
  errorMessage = signal<string | null>(null);
  usernameForm: FormGroup;
  passwordForm: FormGroup;
  private username: string = '';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.usernameForm = this.fb.group({
      username: ['', [Validators.required, UsernameValidator]]
    });

    this.passwordForm = this.fb.group({
      confirmationCode: ['', Validators.required],
      password: ['', [Validators.required, PasswordValidator]],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordMatchValidator });
  }

  private handleError(error: any): void {
    let message = 'An unexpected error occurred. Please try again.';
    if (error && error.name) {
      switch (error.name) {
        case 'UserNotFoundException':
          message = 'The username you entered was not found.';
          break;
        case 'CodeMismatchException':
          message = 'The code you entered is incorrect. Please try again.';
          break;
        case 'LimitExceededException':
          message = 'Too many attempts. Please try again in a few minutes.';
          break;
        default:
          message = error.message || message;
          break;
      }
    }
    this.errorMessage.set(message);;
  }

  ngOnInit(): void {}

  async onResetPassword(): Promise<void> {
    this.errorMessage.set(null);
    this.isLoading = true;
    if(this.usernameForm.valid)
    {
    try {
      this.username = this.usernameForm.get('username')?.value.toLowerCase();
      const { nextStep } = await this.authService.resetPassword(this.username);
      //await resetPassword({ username: this.username });
      if (nextStep.resetPasswordStep === 'CONFIRM_RESET_PASSWORD_WITH_CODE') {
        this.step = 'confirm';
      }
    } catch (error) {
      this.handleError(error);
    } finally {
      this.isLoading = false;
    }
  }
  }

  async onConfirmPasswordReset(): Promise<void> {

    if(this.passwordForm.valid)
    {
      this.isLoading = true;
    try {
      const { confirmationCode, password } = this.passwordForm.value;
      await confirmResetPassword({
        username: this.username,
        confirmationCode: confirmationCode,
        newPassword: password,
      });
        this.step = 'done';
      
    } catch (error) {
      this.handleError(error);
    } finally {
      this.isLoading = false;
    }
  }
  }

}
