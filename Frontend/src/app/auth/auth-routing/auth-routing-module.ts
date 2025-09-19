import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { Signup } from '../components/signup/signup.js';
import { Login } from '../components/login/login.js';
import { ForgotPassword } from '../components/forgot-password/forgot-password.js';


const routes: Route[] = [
  { path: 'login', component: Login},
  { path: 'signup', component: Signup},
  { path: 'forgot-password', component: ForgotPassword}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class AuthRoutingModule { 


}