import { Component, OnInit,AfterViewInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Income } from '../../models/Income/income.js';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeIndia from '@angular/common/locales/en-IN';
import { MatButtonModule } from '@angular/material/button';
import { SessionService } from '../../services/session/session-service.js';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service.js';
import { forkJoin, tap } from 'rxjs';
import { Expense } from '../../models/Expense/expense.js';
import { Investment } from '../../models/Investments/Investment.js';
import { IncomeService } from '../../services/income/income-service.js';
import { ExpenseService } from '../../services/expense/expense-service.js';
import { InvestmentService } from '../../services/investment/investment-service.js';
import { ToastrService } from 'ngx-toastr';

registerLocaleData(localeIndia, 'en-IN');

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})


export class Home implements OnInit {

  constructor(
    private authService: AuthService,
    private incomeService: IncomeService,
    private expenseService: ExpenseService,
    private investmentService: InvestmentService,
    private toastr: ToastrService
    ){
      
    this.currentUser = this.authService.getCurrentUser();
    }


  currentUser: any;
  date: Date = new Date();
  latestIncome: Income|null = null ;
  latestExpense: Expense|null = null;
  latestInvestment: Investment|null = null;

  ngOnInit()
 {
  
  if(this.currentUser && this.currentUser.id )
  {
    forkJoin(
      {
      latestIncome : this.incomeService.getlatestIncomeforUser(this.currentUser.id) , 
      latestExpense: this.expenseService.getLatestExpensesforUser(this.currentUser.id),
      latestInvestment: this.investmentService.getLatestInvestmentsforUser(this.currentUser.id)
      }).subscribe(
        {
          next: (res) => {
            this.latestExpense = res.latestExpense;
            this.latestIncome = res.latestIncome;
            this.latestInvestment = res.latestInvestment;
          },
          error: ()=> 
          {
            this.toastr.error('Something Went Wrong');
          }
        }
      );
  }
 }
  
  
}

