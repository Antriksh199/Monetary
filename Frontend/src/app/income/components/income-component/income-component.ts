import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { IncomeService } from '../../../services/income/income-service.js';
import { Router } from '@angular/router';
import { Income } from '../../../models/Income/income.js';
import { IncomeType } from '../../../models/Admin/income-type.js';
import { Frequency } from '../../../models/Admin/frequency.js';
import { User } from '../../../models/Admin/user.js';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { MatSortModule, MatSort } from '@angular/material/sort';
import {  MatMenuTrigger,MatMenu, MatMenuModule } from "@angular/material/menu";
import { Modalservice } from '../../../services/modal/modalservice.js';
import { Adminservice } from '../../../services/admin/adminservice.js';
import { ChangeDetectorRef } from '@angular/core';
import { SessionService } from '../../../services/session/session-service.js';
import { AuthService } from '../../../services/auth/auth-service.js';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-income-component',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatTableModule, MatSortModule, MatMenuModule],
  templateUrl: './income-component.html',
  styleUrl: './income-component.css'
})

export class IncomeComponent implements OnInit {

  constructor( private cdr: ChangeDetectorRef, private incomeService: IncomeService, private as: Adminservice, private modalService: Modalservice, 
    private ss: SessionService, private router:Router, private au: AuthService, private toastr: ToastrService 
    ){}

  incomes: Income[] = [];
  incomeTypes: IncomeType[]= [];
  frequencies: Frequency[]= [];
  users: User[]= [];
  filteredIncome: Income[]= [];
  contextMenuPosition = { x: '0px', y: '0px' };
  editDeleteRow: any;
  tableColumns: string[] = ['value', 'receivedOn', 'frequency', 'received', 'receivedFrom', 'receivedIn', 'createdDate', 'modifiedDate'];
  dataSource: any;
  editRow: any;
  user: any;
  
  @ViewChild (MatMenuTrigger) triggerMenu! : MatMenuTrigger;


  @ViewChild(MatSort) sort!: MatSort;


    OnView(row: Income)
    {
     this.modalService.OpenIncomeViewDetails(row).subscribe(
      {
        
      }
     );
    }
  

    private setTableSortAndDataAccessor(): void {
      setTimeout(() => {
        if (this.dataSource) {
          this.dataSource.sort = this.sort;
          this.dataSource.sortingDataAccessor = (item: any, property: any) => {
            switch (property) {
              case 'modifiedDate':
                return new Date(item.modifiedDate).getTime();
              default:
                return item[property];
            }
          };
          
          if(this.sort){
          this.sort.active = 'modifiedDate';
          this.sort.direction = 'desc';
          this.sort.sortChange.emit();
          this.cdr.detectChanges();
        }
        }
      });
    }


  getIncome()
  {
    this.user = new User();
    this.user = this.au.getCurrentUser();
    if(this.user && this.user.id)
    {
    this.incomeService.getIncomesforUser(this.user.id).subscribe({
        next: (res: Income[])=>
        {
          if(res)
          { 
          this.incomes = res;
        }
        },
        error: (e)=> {
          this.toastr.error("Something went wrong !");
        },
        complete : ()=>  {
          this.filteredIncome = this.incomes.filter(x => x.source?.id == 1);
          this.dataSource = new MatTableDataSource<Income>(this.filteredIncome);
          this.setTableSortAndDataAccessor();
        }
       });
      }
      else
      {
        this.toastr.info("You need to login first to see incomes.");
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

OnEdit(row: Income){
  this.modalService.EditIncomeModal(row).subscribe(
    {
      next: (res)=> {
        if(res)
        {
        var inc = new Income();
        inc.id = row.id;
        inc.source = res.source;
        inc.frequency = res.frequency;
        inc.receivedIn = res.receivedIn;
        inc.receivedFrom = res.receivedFrom;
        inc.receivedIn = res.receivedIn.uPaymentMethod;
        inc.description = res.description;
        inc.received = res.received;
        inc.receivedOn = res.receivedOn;
        inc.value = res.value;
        inc.user = this.ss.getCurrentUser();
        inc.createdBy = inc.user.userName;
        inc.createdDate = row.createdDate;
        inc.modifiedDate = new Date();
        inc.modifiedBy = inc.user.userName;
        this.incomeService.editIncome(inc).subscribe(
          {
            next: (res: Income) => {
              this.router.navigate(['/income']);
            }
          }
        );
        }
      },
      error: (error)=> {
        this.toastr.error("Something went wrong !");
      },
      complete : ()=> {
        
        this.router.navigate(['/income']);
      }
    });
}

OnDelete(row: any){
  this.modalService.openDeleteIncomeModal(row).subscribe(
    {
      next: (res: Income) => {
        if(res)
        this.toastr.success('Income Deleted Successfully !');
      },
      error: (e) => {
        this.toastr.error('Something went wrong !');
      }
    }
  );
}

  toggleIncome(id: any): void
  {
    this.filteredIncome = this.incomes.filter(x => x.source?.id == (id+1).toString());
    this.dataSource = new MatTableDataSource<Income>(this.filteredIncome);
    this.setTableSortAndDataAccessor();
  }

  ngOnInit(): void
  {
    this.as.getIncomeTypes().subscribe(
      {
        next: (res: IncomeType[]) => this.incomeTypes = res
      }
    );
    this.getIncome(); 
    this.toggleIncome(0);
    
  
  }


}
