import { Component, OnInit, signal } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenavModule} from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import {MatMenuModule, MatMenu } from '@angular/material/menu';
import { Modalservice } from '../../services/modal/modalservice.js';
import { ExpenseService } from '../../services/expense/expense-service.js'
import { SessionService } from '../../services/session/session-service.js';
import { Income } from '../../models/Income/income.js';
import { IncomeService } from '../../services/income/income-service.js';
import { Expense } from '../../models/Expense/expense.js';
import { Investment } from '../../models/Investments/Investment.js';
import { InvestmentService } from '../../services/investment/investment-service.js';
import { AuthService } from '../../services/auth/auth-service.js';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet,RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, CommonModule, MatMenuModule, 
    MatMenu],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
 
  _isLoading$: Observable<boolean> ;
  user: any;
  income: Income = new Income();
  sideNav: boolean = false;
  clickedComponent: string = "";


    constructor(private modalService: Modalservice, private ss:SessionService, 
      private is: IncomeService, private es: ExpenseService, private investmentService: InvestmentService, private au: AuthService
      , private toastr: ToastrService, private router: Router){
        this.user = this.au.getCurrentUser();
        this._isLoading$ = this.au.isLoading$;
    }


  toggleSideNav()
  {
    this.sideNav = !this.sideNav;
  }

  async logout(): Promise<void>{
    this.au.logout();
    this.router.navigate(['login']);
  }

  openIncomeModalSignal()
  {
    this.modalService.openIncomeModal().subscribe({
      next: (res)=> { 
        if(res)
        {
        var inc = new Income();
        inc.source = res.source;
        inc.frequency = res.frequency;
        inc.receivedIn = res.receivedIn;
        inc.receivedFrom = res.receivedFrom;
        inc.receivedIn = res.receivedIn?.uPaymentMethod;
        inc.description = res.description;
        inc.received = res.received;
        inc.receivedOn = res.receivedOn;
        inc.value = res.value;
        inc.user = this.user;
        inc.createdBy = this.user.userName;
        inc.createdDate = new Date();
        inc.modifiedDate = new Date();
        inc.modifiedBy = this.user.userName;
        this.is.addNewIncome(inc).subscribe(
          {
            next: (res: Income) => {
              if(res)
              {
                this.toastr.success('Income saved successfully !');
                this.router.navigate(['income']);
              }
            },
            error: (e)=> this.toastr.error('Something went wrong !'),
            complete: ()=>{}
          }
        );
      }
    },
      error: (error)=> {this.toastr.error('Something went wrong !');},
      complete : ()=> {}
    });
    
  }

  openExpenseModalSignal()
  {
    this.modalService.openExpenseModal().subscribe({
      next: (res)=> { 
        if(res)
        {
        var expense = new Expense();
        expense.createdBy = this.user.userName;
        expense.modifiedBy = this.user.userName;
        expense.createdDate = new Date();
        expense.modifiedDate = new Date();
        expense.frequency = res.frequency;
        expense.expenseCategory = res.expenseCategory;
        expense.expenseType = res.expenseType;
        expense.paid = res.paid;
        expense.paidVia = res.paidVia.uPaymentMethod;
        expense.paidTo = res.paidTo;
        expense.paidOn = res.paidOn ? res.paidOn : null;
        expense.user = this.user;
        expense.description = res.description;
        expense.value = res.value;
        this.es.addexpense(expense).subscribe(
          {
            next: (res: Expense)=> 
            {
              this.toastr.success('Expense Saved Successfully !');
              this.router.navigate(['expense']);
            },
            error: (error)=> {
              this.toastr.error('Something went wrong !');
            },
            complete : ()=> {}
          }
        );
        }
      },
      error: (error)=> {
        this.toastr.error('Something went wrong !');
      },
      complete : ()=> {}
    });
  }

  openInvestmentModalSignal()
  {
    this.modalService.openInvestmentModal().subscribe({
      next: (res)=> { 
        if(res)
        {
        var investment = new Investment();
        investment.createdBy = this.user.userName;
        investment.modifiedBy = this.user.userName;
        investment.createdDate = new Date();
        investment.modifiedDate = new Date();
        investment.frequency = res.frequency;
        investment.investmentCategory = res.investmentCategory;
        investment.investmentType = res.investmentType;
        investment.invested = res.invested;
        investment.investedVia = res.investedVia.uPaymentMethod;
        investment.investedTo = res.investedTo;
        investment.investedOn = res.investedOn ? res.investedOn : null;
        investment.user = this.user;
        investment.description = res.description;
        investment.value = res.value;
        investment.tenure = res.tenure;
        investment.growthRate = res.growthRate.toString() == '' ? res.investmentType.growthRate : res.growthRate;
        this.investmentService.addinvestment(investment).subscribe(
          {
            next: (res: Investment) => 
            {
              if(res)
              {
              this.toastr.success('Investment added successfully');
              this.router.navigate(['investment']);
              }
            },
            error : () => { this.toastr.error('Something went wrong !')}
          }
        );
        }
      },
      error: (error)=> {
        this.toastr.error('Something went wrong');
      },
      complete : ()=> {}
    });
  }
  

  ngOnInit(): void {
  }

}
