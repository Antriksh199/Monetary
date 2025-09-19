import { Routes } from '@angular/router';
import { Home } from './shared/home/home.js';
import { authGuard } from './guards/auth-guard.js';
import { MainLayout } from './main-layout/main-layout.js';
import { AuthLayout } from './auth-layout/auth-layout.js';

export const routes: Routes = [

    {
      path: '', component: MainLayout, canActivate:[authGuard] , 
      children: [
        {path: 'home', component: Home},
        {path: 'income', loadChildren: () => import('./income/income-module.js').then(m => m.IncomeModule)},
        {path: 'expense', loadChildren: () => import('./expenditure/expenditure-module.js').then(m => m.ExpenditureModule)},
        {path: 'investment', loadChildren: () => import('./investment/investment-module.js').then(m => m.InvestmentModule)},
      ]
    },
    {
      path: '',
      component: AuthLayout,
      children: [
        { path: '', loadChildren: ()=> import('./auth/auth-module.js').then(m=>m.AuthModule)}
        // { path: 'login', component: Login },
        // { path: 'forgot-password', component: ForgotPassword },
        // { path: 'signup', component: Signup },
      ],
    },
    { path: '**', redirectTo: '' },
];