import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { InvestmentService } from '../../../services/investment/investment-service.js';
import { Adminservice } from '../../../services/admin/adminservice.js';
import { Router } from '@angular/router';
import { Income } from '../../../models/Income/income.js';
import { IncomeType } from '../../../models/Admin/income-type.js';
import { ChangeDetectorRef } from '@angular/core';
import { Frequency } from '../../../models/Admin/frequency.js';
import { User } from '../../../models/Admin/user.js';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatMenuTrigger , MatMenu, MatMenuModule } from "@angular/material/menu";
import { Modalservice } from '../../../services//modal/modalservice.js';
import { SessionService } from '../../../services/session/session-service.js';
import { Investment } from '../../../models/Investments/Investment.js';
import { InvestmentCategoryTypeWrapper } from '../../../models/Admin/InvestmentCategoryTypeWrapper.js';
import { AuthService } from '../../../services/auth/auth-service.js';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-investment-component',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatTableModule, MatSortModule, MatMenuModule],
  templateUrl: './investment-component.html',
  styleUrl: './investment-component.css'
})


export class InvestmentComponent implements OnInit{

  constructor(private investmentService: InvestmentService, private adminService: Adminservice, 
    private modalService: Modalservice, private ss: SessionService, private router:Router,  private au: AuthService,
    private cdr: ChangeDetectorRef, private toastr: ToastrService
  ) {
    this.user = this.au.getCurrentUser();
  }

  investments: Investment[] = [];
  incomeTypes: IncomeType[]= [];
  frequencies: Frequency[]= [];
  users: User[]= [];
  investmentCategoryTypes: InvestmentCategoryTypeWrapper[] = [];
  filteredInvestments: Investment[]= [];
  contextMenuPosition = { x: '0px', y: '0px' };
  editDeleteRow: any;
  tableColumns: string[] = ['type', 'investedOn', 'value', 'invested','investedTo', 'investedVia', 'frequency', 'createdDate', 'createdBy', 'modifiedDate', 'modifiedBy'];
  dataSource: any;
  editRow: any;
  user: any;

  @ViewChild (MatMenuTrigger) triggerMenu! : MatMenuTrigger;


  @ViewChild(MatSort) sort!: MatSort;


    OnView(row: Investment)
    {
     this.modalService.OpenInvestmentViewDetails(row).subscribe(
      {
        next: ()=> {}
      }
     );
    }
  
  getInvestments()
  {
    if(this.user && this.user.id)
    {
  this.investmentService.getAllInvestmentsforUser(this.user.id).subscribe({
        next: (res: Investment[])=>
        {
          this.investments = res;
        },
        error: (e)=> { 
          this.toastr.error('Something went wrong');},
        complete : ()=>  {
          this.filteredInvestments = this.investments.filter(x => x.investmentCategory?.id == 1);
          this.dataSource = new MatTableDataSource<Investment>(this.filteredInvestments);
          this.setTableSortAndDataAccessor();
        }
        });
        }
        else
        {
          this.toastr.info('Please Login to see your investments');
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

OnEdit(row: Investment){
  this.modalService.EditInvestmentModal(row).subscribe(
    {
      next: (res: any)=> {
        if(res)
        {
        var investment = new Investment();
        investment.modifiedBy = this.user.userName;
        investment.modifiedDate = new Date();
        investment.createdDate = row.createdDate;
        investment.createdBy = row.createdBy;
        investment.investmentCategory = res.investmentCategory;
        investment.investmentType = res.investmentType;
        investment.frequency = res.frequency;
        investment.invested = res.invested;
        investment.investedOn = res.investedOn;
        investment.value = res.value;
        investment.investedTo = res.investedTo;
        investment.investedVia = res.investedVia.uPaymentMethod;
        investment.tenure = res.tenure;
        investment.growthRate = res.growthRate == '' ? res.investmentType.growthRate : res.growthRate;
        investment.user = this.user;
        investment.id = row.id;
        investment.description = res.description;
        this.investmentService.updateInvestment(investment).subscribe(
          {
            next: (res: Investment) => {
              this.toastr.success('Investment saved successfully.');
            this.router.navigate(['investment']).then(()=> window.location.reload());
            },
            error: (err) => this.toastr.error('Something Went Wrong !'),
            complete: ()=> {
          }
          }
        );
      }
    },
      error: (error: Error)=> {
        this.toastr.error('Something went wrong !');
      },
      complete : ()=> {
      }
    });
}

OnDelete(row: any){
  this.modalService.openDeleteInvestmentModal(row).subscribe(
    {
      next: (res: Investment) => {
        this.toastr.success('Investment Deleted Successfully !');
      },
      error: (e) => {
        this.toastr.error('Something went wrong !');
      }
    }
  );
}

private setTableSortAndDataAccessor(): void {
  // Use setTimeout to ensure the MatSort directive has been rendered for the new table
  setTimeout(() => {
    if (this.sort && this.dataSource) {
      this.dataSource.sortingDataAccessor = (item: any, property: string) => {
        switch (property) {
          case 'type':
            return item.investmentType?.name || '';
          case 'investedVia':
            return item.investedVia?.paymentMethod?.name || '';
          case 'frequency':
            return item.frequency?.name || '';
          case 'createdDate':
            return new Date(item.createdDate).getTime();
          case 'modifiedDate':
            return new Date(item.modifiedDate).getTime();
          default:
            return item[property] || '';
        }
      }  
      this.dataSource.sort = this.sort;
      this.sort.sortChange.emit();
      this.cdr.detectChanges();
    }
  });
}

  toggleIncome(id: any): void
  {
    this.filteredInvestments = this.investments.filter(x => x.investmentCategory?.id == (id+1).toString());
    this.dataSource = new MatTableDataSource<Investment>(this.filteredInvestments);
    setTimeout(()=> {
    this.setTableSortAndDataAccessor();
    });
    
  }

  ngOnInit(): void
  {
    this.adminService.getInvestmentCategoryType().subscribe(
      {
        next: (res: InvestmentCategoryTypeWrapper[]) => 
        {
          this.investmentCategoryTypes = res;
        },
        error: (e)=> this.toastr.error('Something went wrong !'),
        complete: ()=>{}
      }
    );
    this.getInvestments(); 
  }
}
