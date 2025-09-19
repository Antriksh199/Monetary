import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../services/auth/auth-service.js';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SessionService } from '../../../services/session/session-service.js';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IncomeRoutingModule } from "../../../income/income-routing/income-routing-module.js";

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatIconModule, MatProgressSpinnerModule, IncomeRoutingModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit{

  user: any;
  loginForm: any;
  hide = true;
  loginError: any;
  tokens: any;
  isLoading$: Observable<boolean> ;
  errorMessage = signal<string | null>(null);
  constructor(
    private authService: AuthService, private fb: FormBuilder, private sessionService: SessionService, private router: Router
  ) {
    this.loginForm = this.fb.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    );
    
    this.isLoading$ = this.authService.isLoading$;
    this.errorMessage.set(null);
    }

  async ngOnInit(): Promise<void> 
  {
    this.authService.user$.subscribe(
      {
        next: (user) => 
          {
          this.user = user;
          if(this.user)
          {
            this.router.navigate(['home']);
          }
        }
      }
    );
  }

  onForgotPassword(event: any)
  {
    this.router.navigate(['forgot-password']);
  }

  onCreateAccount(event: any)
  {

  }

  private getErrorMessage(error: any): string {
    switch (error.name) {
      case 'UserNotFoundException':
      case 'NotAuthorizedException':
        return 'Incorrect username or password.';
      case 'TooManyFailedAttemptsException':
        return 'Account locked due to too many failed attempts.';
      case 'UserAlreadyAuthenticatedException':
        return 'You are already authenticated in this session.';
      case 'UserNotConfirmedException':
        return 'You have not confirmed your account !';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }

  async onSubmit()
  {
    this.loginError = null;
    if (this.loginForm.valid) {
      try {
        await this.authService.login(this.loginForm.value);
        this.router.navigate(['home']);
      } catch (error: any) {
        this.loginError = this.getErrorMessage(error);
      }
    }
      
  }

}
