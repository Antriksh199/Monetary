import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { IncomeService } from '../../../../services/income/income-service.js';
import { ExpenseService } from '../../../../services/expense/expense-service.js';
import { Router } from '@angular/router';
import { Income } from '../../../../models/Income/income.js';
import { IncomeType } from '../../../../models/Admin/income-type.js';
import { ChangeDetectorRef } from '@angular/core';
import { Frequency } from '../../../../models/Admin/frequency.js';
import { User } from '../../../../models/Admin/user.js';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { MatSortModule, MatSort } from '@angular/material/sort';
import {  MatMenuTrigger, MatMenuModule } from "@angular/material/menu";
import { Modalservice } from '../../../../services/modal/modalservice.js';
import { Adminservice } from '../../../../services/admin/adminservice.js';
import { SessionService } from '../../../../services/session/session-service.js';
import { Expense } from '../../../../models/Expense/expense.js';
import { ExpenseCategoryTypeWrapper } from '../../../../models/Admin/ExpenseCategoryTypeWrapper.js';
import { AuthService } from '../../../../services/auth/auth-service.js';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-expense-component',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatTableModule, MatSortModule, MatMenuModule],
  templateUrl: './expense-component.html',
  styleUrl: './expense-component.css'
})
export class ExpenseComponent implements OnInit{

  constructor(private incomeService: IncomeService, private as: Adminservice, private modalService: Modalservice, 
    private ss: SessionService, private router:Router, private expenseService: ExpenseService, private cdr: ChangeDetectorRef,
    private authService: AuthService, private toastr: ToastrService
    ){
      this.user = this.authService.getCurrentUser();
    }
  expenses: Expense[] = [];
  incomeTypes: IncomeType[]= [];
  frequencies: Frequency[]= [];
  users: User[]= [];
  expenseCategoryTypes: ExpenseCategoryTypeWrapper[] = [];
  filteredExpenses: Expense[]= [];
  contextMenuPosition = { x: '0px', y: '0px' };
  editDeleteRow: any;
  tableColumns: string[] = ['type', 'paidOn', 'value', 'paid','paidTo', 'paidVia', 'frequency', 'createdDate', 'modifiedDate'];
  dataSource: any;
  editRow: any;
  user: any;

  @ViewChild (MatMenuTrigger) triggerMenu! : MatMenuTrigger;


  @ViewChild(MatSort) sort!: MatSort;

    OnView(row: Expense)
    {
     this.modalService.OpenExpenseViewDetails(row).subscribe(
      {
        next: ()=> {},
        error: ()=> { this.toastr.error('Something went wrong !')}
      }
     );
    }
    
    private setTableSortAndDataAccessor(): void {
      // Use setTimeout to ensure the MatSort directive has been rendered for the new table
      setTimeout(() => {
        if (this.dataSource && this.sort) {
          this.dataSource.sort = this.sort;
          this.dataSource.sortingDataAccessor = (item: any, property: any) => {
            switch (property) {
              case 'type':
                return item.expenseType.name;
              case 'paidVia':
                return item.paidVia.paymentMethod.name
              case 'modifiedDate':
                return new Date(item.modified_date).getTime();
              default:
                return item[property];
            }
          };
          if(this.sort){
          this.sort.active = 'modifiedDate';
          this.sort.direction = 'desc';
          this.sort.sortChange.emit();
        }
        this.cdr.detectChanges();
        }
      });
    }


  getExpenses()
  {
    if(this.user && this.user.id)
    {
    this.expenseService.getAllExpensesforUser(this.user.id).subscribe({
        next: (res: Expense[])=>
        {
          this.expenses = res;
        },
        error: (e)=> { 
          this.toastr.error("Something went wrong !");
        },
        complete : ()=>  {
          this.filteredExpenses = this.expenses.filter(x => x.expenseCategory?.id == 1);
          this.dataSource = new MatTableDataSource<Expense>(this.filteredExpenses);
          this.setTableSortAndDataAccessor();
        }
  });
        }
        else
        {
          this.toastr.info("You need to login first to see your expenditures.");
        }
          }

onRightClick(event: MouseEvent, row: any){
  event.preventDefault(); 
  this.editRow = row;
  this.contextMenuPosition.x = event.clientX + 'px';
  this.contextMenuPosition.y = event.clientY + 'px';
  this.triggerMenu.openMenu();
  //this.
}

OnEdit(row: Expense){
  this.modalService.EditExpenseModal(row).subscribe(
    {
      next: (res)=> {
        if(res)
        {
        var expense = new Expense();
        expense.modifiedBy = this.user.userName;
        expense.modifiedDate = new Date();
        expense.createdDate = row.createdDate;
        expense.createdBy = row.createdBy;
        expense.expenseCategory = res.expenseCategory;
        expense.expenseType = res.expenseType;
        expense.frequency = res.frequency;
        expense.paid = res.paid;
        expense.paidOn = res.paidOn;
        expense.value = res.value;
        expense.paidTo = res.paidTo;
        expense.paidVia = res.paidVia.uPaymentMethod;
        expense.user = this.user;
        expense.id = row.id;
        expense.description = res.description;
        this.expenseService.updateExpense(expense).subscribe(
          {
            next: (res: Expense) => {
              this.toastr.success('Expense Saved Successfully !');
              
            this.router.navigate(['expense']).then(()=> window.location.reload());
            },
            error: ()=> this.toastr.error('Something went wrong !'),
            complete: ()=> {
          }
          }
        );
      }
    },
      error: (error)=> {this.toastr.error('Something went wrong !')},
      complete : ()=> {
      }
    });
}

OnDelete(row: any){
  this.modalService.openDeleteExpenseModal(row).subscribe(
    {
      next: (res) => {},
      error: ()=> this.toastr.error('Something went wrong !')
    }
  );
}

  toggleIncome(id: any): void
  {
    this.filteredExpenses = this.expenses.filter(x => x.expenseCategory?.id == (id+1).toString());
    this.dataSource = new MatTableDataSource<Income>(this.filteredExpenses);
    this.setTableSortAndDataAccessor();
  }

  ngOnInit(): void
  {
    this.as.getExpenseCategoryType().subscribe(
      {
        next: (res: ExpenseCategoryTypeWrapper[]) => 
        {
          this.expenseCategoryTypes = res;
        },
        error: ()=> this.toastr.error('Something went wrong !'),
        complete: ()=>{}
      }
    );
    this.getExpenses(); 
  }

}
