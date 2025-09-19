import { Component, Inject, OnInit, ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IncomeService } from '../../../services/income/income-service.js';
import { Frequency } from '../../../models/Admin/frequency.js';
import { IncomeType } from '../../../models/Admin/income-type.js';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import {MatSlideToggleModule, MatSlideToggleChange} from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { ValueValidator, RateValidator, TenureValidator } from '../../validators/income-form.js';
import { PaymentMethod } from '../../../models/Admin/PaymentMethod.js';
import { Adminservice } from '../../../services/admin/adminservice.js';
import { forkJoin } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserCards } from '../../../models/Admin/UserCards.js';
import { UserBank } from '../../../models/Admin/UserBanks.js';
import { UserCash } from '../../../models/Admin/UserCash.js';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule, MatMenu } from '@angular/material/menu';
import { Modalservice } from '../../../services/modal/modalservice.js';
import { UserUPI } from '../../../models/Admin/UserUPI.js';
import { UserPaymentMethod } from '../../../models/Admin/UserPaymentMethod.js';
import { UserPaymentMethodWrapper } from '../../../models/Admin/UserPaymentMethodWrapper.js';
import { AddUserPayment } from '../../../models/Admin/AddUserPayment.js';
import { SessionService } from '../../../services/session/session-service.js';
import { ExpenseCategoryTypeWrapper } from '../../../models/Admin/ExpenseCategoryTypeWrapper.js';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { InvestmentCategoryTypeWrapper } from '../../../models/Admin/InvestmentCategoryTypeWrapper.js';
import { Router } from '@angular/router';
import { ExpenseService } from '../../../services/expense/expense-service.js';
import { AuthService } from '../../../services/auth/auth-service.js';
import { ToastrService } from 'ngx-toastr';
import { InvestmentService } from '../../../services/investment/investment-service.js';

@Component({
  selector: 'app-modal-component',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatMenuModule, ReactiveFormsModule, MatIconModule, MatSlideToggleModule, 
    MatDialogModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule ],
  templateUrl: './modal-component.html',
  styleUrl: './modal-component.css'
})
export class ModalComponent implements OnInit{

  loading = signal<boolean>(false);
  paymentMethod: any;
  userPaymentMethod: any;
  user: any;
  selected: any;
  userPayment: any;
  itemForm: any;
  selectedPayment: any;
  frequencies: Frequency[] = [];
  incomeTypes: IncomeType[] = []
  paymentMethods: any;
  defaultPaymentMethods: PaymentMethod[] = [];
  userPaymentMethodWrapper?: UserPaymentMethodWrapper;
  addpayment?: AddUserPayment;
  addedPayement: any;
  expenseCategoryTypeWrapper: ExpenseCategoryTypeWrapper[] =[];
  investmentCategoryTypeWrapper: InvestmentCategoryTypeWrapper[] =[];
  expenseTypes: any;
  toggler: boolean = false;
  disablefutureDates: any = null;
  disablepreviousDates: any = new Date();
  investmentRisk: any = new Map<string, any>([
    ["Very High", {color: '#D32F2F'}],
    ["High", {color: '#F57C00'}],
    ["Medium", {color: '#FBC02D'}],
    ["Low", {color: '#388E3C'}]
  ]);

      constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fs: IncomeService,
        private es: ExpenseService,
        private is: InvestmentService,
        private cdr: ChangeDetectorRef,
        private ss: SessionService,
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<ModalComponent>,
        private as: Adminservice,
        private modalService: Modalservice,
        private router: Router,
        private au: AuthService,
        private toastr: ToastrService
      ) {
        this.user = this.au.getCurrentUser();
      }

      onToggleChange(event: MatSlideToggleChange)
      {
          this.toggler = event.checked;
          if(this.toggler)
          {
            this.disablefutureDates = new Date();
            this.disablepreviousDates = null;
            if(this.data.component == "Expense")
            {
            this.itemForm.get('paidOn')?.enable();
            }
            else if(this.data.component == "Investment")
            {
            this.itemForm.get('investedOn')?.enable();
            }
            else
            {
            this.itemForm.get('receivedOn')?.enable();
            }
          }
          else
          { 
            this.disablefutureDates = null;
            this.disablepreviousDates =  new Date();
            if(this.data.component == "Expense")
            {
            this.itemForm.get('paidOn')?.disable();
            }
            else if(this.data.component == "Investment")
            {
            this.itemForm.get('investedOn')?.disable();
            }
            else
            {
            this.itemForm.get('receivedOn')?.disable();
            }
          }
      }
      onNoClick(): void {
        this.dialogRef.close();
      }

      OnDelete()
      {
        if(this.data.component == "Expense" && this.data.action == "delete" && this.data.deleteData)
        {
          this.es.deleteExpense(this.data.deleteData.expense).subscribe(
            {
              next: (res: any) => {
                this.toastr.success('Expense deleted successfully !');
              },
              error: () => {this.toastr.error('Something went wrong !')},
              complete: () => { 
                this.router.navigate(['/expense']).then(()=> window.location.reload());
              }
            }
          );
        }
        else if(this.data.component == "Income" && this.data.action == "delete" && this.data.deleteData)
        {
          this.fs.deleteIncome(this.data.deleteData.income).subscribe(
            {
              next: (res: any) => {
                this.toastr.success('Income deleted successfully !');
                
                this.router.navigate(['/income']).then(()=> window.location.reload());
              },
              error: () => {this.toastr.error('Something went wrong !')},
              complete: () => {  
              }
            }
          );
        }
        else 
        {
          this.is.deleteInvestment(this.data.deleteData.investment).subscribe(
            {
              next: (res: any) => {
                this.toastr.success('Investment deleted successfully !');
              },
              error: () => {this.toastr.error('Something went wrong !')},
              complete: () => {  
                this.router.navigate(['/investment']).then(()=> window.location.reload());
              }
            }
          );
        }
      }

      AddPayment(value: any)
      {
        if(value && value != "Cash")
        {
          this.modalService.openPaymentMethodModal(value).subscribe({
              next: (res: any)=> 
              {
                if(res)
                {
                  this.loading.set(true);
                try
                {
                  if(value)
                  {
                    this.userPaymentMethod = new UserPaymentMethod();
                      this.userPaymentMethod.paymentMethod =  this.defaultPaymentMethods.filter(x=> x.name == value)[0];
                      this.userPaymentMethod.createdBy = this.user.userName;
                      this.userPaymentMethod.modifiedBy = this.user.userName;
                      this.userPaymentMethod.createdDate = new Date();
                      this.userPaymentMethod.modifiedDate = new Date();
                      this.userPaymentMethod.user = this.user;

                    if(value == "Credit Card" || value == "Debit Card")
                    {
                      this.userPayment = new UserCards();
                      this.userPayment.uPaymentMethod = this.userPaymentMethod;
                      this.userPayment.provider = res.provider;
                      this.userPayment.cardNumber = res.cardNumber;
                      this.userPayment.customerName = res.name;
                      this.userPayment.cardType = value;
                      this.userPayment.cvv = res.cvv;
                      this.userPayment.createdBy = this.user.userName;
                      this.userPayment.modifiedBy = this.user.userName;
                      this.userPayment.expiryDate = this.userPayment.transformDate(res.expiryDate);
                      this.userPayment.createdDate = new Date();
                      this.userPayment.modifiedDate = new Date();
                      this.addpayment = new AddUserPayment()
                      this.addpayment.PaymentMethod = value;
                      this.addpayment.card = this.userPayment;
                    }

                    else if(value == "Bank Transfer")
                    {
                      this.userPayment = new UserBank();
                      this.userPayment.uPaymentMethod = this.userPaymentMethod;
                      this.userPayment.accountNumber = res.accountNumber;
                      this.userPayment.Ifsc = res.ifsc;
                      this.userPayment.bankName = res.bank;
                      this.userPayment.accountType = res.accountType;
                      this.userPayment.createdBy = this.user.userName;
                      this.userPayment.modifiedBy = this.user.userName;
                      this.userPayment.createdDate = new Date();
                      this.userPayment.modifiedDte = new Date();
                      this.addpayment = new AddUserPayment()
                      this.addpayment.PaymentMethod = value;
                      this.addpayment.bank = this.userPayment;
                    }
                    else if (value == "UPI")
                    {
                      this.userPayment = new UserUPI();
                      this.userPayment.uPaymentMethod = this.userPaymentMethod;
                      this.userPayment.upiId = res.upiid;
                      this.userPayment.method = "UPI";
                      this.userPayment.createdBy = this.user.userName;
                      this.userPayment.modifiedBy = this.user.userName;
                      this.userPayment.createdDate = new Date();
                      this.userPayment.modified_date = new Date();
                      this.addpayment = new AddUserPayment()
                      this.addpayment.PaymentMethod = value;
                      this.addpayment.upi = this.userPayment;
                    }
                    
                      this.as.addUserPaymentMethod(this.addpayment).subscribe(
                        {
                          next: (res: AddUserPayment)=> {
                            if(value == "Credit Card" || value == "Debit Card")
                            {
                              if(res.card)
                              {
                              this.addedPayement = new UserCards();
                              this.addedPayement = res.card;
                              this.userPaymentMethodWrapper!.cards =[
                                ...(this.userPaymentMethodWrapper?.cards || []),
                                this.addedPayement
                              ];
                              this.cdr.detectChanges();
                              }
                            
                            }
                            else if(value == "Bank Transfer")
                            {
                              if(res.bank)
                              {
                              this.addedPayement = new UserBank();
                              this.addedPayement = res.bank;
                              this.userPaymentMethodWrapper!.banks =[
                                ...(this.userPaymentMethodWrapper?.banks || []),
                                this.addedPayement
                              ];
                              this.cdr.detectChanges();
                              }
                            }
                            else if(value == "UPI")
                            {
                              if(res.upi)
                              {
                                this.addedPayement = new UserUPI();
                                this.addedPayement = res.upi;
                                this.userPaymentMethodWrapper!.upis = [
                                  ...(this.userPaymentMethodWrapper?.upis || []),
                                  this.addedPayement
                                ];
                                this.cdr.detectChanges();
                              }
                            }
                            this.toastr.success('Payment Method added successfully !');
                          },
                          error: (e: any)=> this.toastr.error('Something went wrong !'),
                          complete: ()=> { this.loading.set(false);}
                        }
                        
                      );
                  }
                }
                catch(error)
                {
                  this.toastr.error('Something went wrong !')
                }
              }
              }
            });
          
        }

        else
        {
          if(value == "Cash")
                    {           
                      this.userPaymentMethod = new UserPaymentMethod();
                      this.userPaymentMethod.paymentMethod =  this.defaultPaymentMethods.filter(x=> x.name == value)[0];
                      this.userPaymentMethod.createdBy = this.user.userName;
                      this.userPaymentMethod.modifiedBy = this.user.userName;
                      this.userPaymentMethod.createdDate = new Date();
                      this.userPaymentMethod.modifiedDate = new Date();
                      this.userPaymentMethod.user = this.user;
                      this.userPayment = new UserCash();
                      this.userPayment.uPaymentMethod = this.userPaymentMethod;
                      this.userPayment.createdBy = this.user.userName;
                      this.userPayment.modifiedBy = this.user.userName;
                      this.userPayment.createdDate = new Date();
                      this.userPayment.modifiedDate = new Date();
                      this.addpayment = new AddUserPayment()
                      this.addpayment.PaymentMethod = value;
                      this.addpayment.cash = this.userPayment;
                      this.as.addUserPaymentMethod(this.addpayment).subscribe({
                        next: (res: AddUserPayment) => {
                          if(res.cash)
                              {
                              this.addedPayement = new UserCash();
                              this.addedPayement = res.cash;
                              this.userPaymentMethodWrapper!.cash = [...this.userPaymentMethodWrapper!.cash, this.addedPayement];
                              this.cdr.detectChanges();
                              this.toastr.success('Payment Method Added Successfully !');
                              }
                        },
                        error: (e: any)=> this.user.userName,
                        complete: ()=> {}
                      });
                    
          }
        }
        
      }

      onSave(): void {
        if (this.itemForm.valid) {
          this.dialogRef.close(this.itemForm.value);
        } 
        else 
        {
          this.itemForm.updateValueAndValidity(); 
          this.itemForm.markAllAsTouched();
        }
      }

      ngAfterViewInit(){
        this.cdr.detectChanges();
      }

      getCurrentPaymentMethod(name: string, id: number)
      {
        if(this.userPaymentMethodWrapper && this.data.formData && name)
        {
          switch(name)
          {
            case "Credit Card":
              return this.userPaymentMethodWrapper.cards.filter(x=> x.uPaymentMethod?.id == id)[0];
              break;
            
            case "Debit Card":
              return this.userPaymentMethodWrapper.cards.filter(x=> x.uPaymentMethod?.id == id)[0];
              break;

            case "Bank Transfer":
                return this.userPaymentMethodWrapper.banks.filter(x=> x.uPaymentMethod?.id == id)[0];
                break;

            case "UPI":
                  return this.userPaymentMethodWrapper.upis.filter(x=> x.uPaymentMethod?.id == id)[0];
                  break;

            case "Cash":
                    return this.userPaymentMethodWrapper.cash[0];
            default:
              return null;
          }
        }
        return null;
      }

      OnSelectionChangeEvent(event: MatSelectChange)
      {
        if(event.value && event.value != 0)
        {
          const selectedValue = event.value;
          if(this.data.component == "Expense")
          this.expenseTypes = (this.expenseCategoryTypeWrapper.filter((x)=> x.expenseCategory?.id == selectedValue.id)[0]).expenseTypes;
          if(this.data.component == "Investment")
          this.expenseTypes = (this.investmentCategoryTypeWrapper.filter((x)=> x.investmentCategory?.id == selectedValue.id)[0]).investmentTypes;

        }
      }

      compareById = (option1: any, option2: any) => {
        return option1 && option2 ? option1.id === option2.id : option1 === option2;
      }

      ngOnInit(): void {
        
        if(this.data.component == 'Income')
        {
          forkJoin(
            {
            frequencies: this.as.getFrequencies(),
            incomeTypes: this.as.getIncomeTypes(),
            userPaymentMethodWrapper: this.as.getUserPaymentMethods(this.user.id),
            defaultPaymentMethods: this.as.getDefaultPaymentMethods()
            }).subscribe({
              next: (res: any)=>
              {
                this.frequencies = res.frequencies;
                this.incomeTypes = res.incomeTypes;
                this.userPaymentMethodWrapper = res.userPaymentMethodWrapper;
                this.defaultPaymentMethods = res.defaultPaymentMethods;
                if (this.userPaymentMethodWrapper?.cash.length)
                {
                  this.defaultPaymentMethods = this.defaultPaymentMethods.filter(x => x.name != "Cash");
                }
                this.cdr.detectChanges();

          if(this.data.formData)
          {
            this.toggler = this.data.formData.received;
            if(this.toggler)
            {
              this.disablefutureDates = new Date();
              this.disablepreviousDates = null;
            }
            this.selectedPayment = this.getCurrentPaymentMethod(this.data.formData.receivedIn.paymentMethod.name, this.data.formData.receivedIn.id);
            this.itemForm = this.fb.group({
              source: [this.data.formData.source, Validators.required],
              value: [this.data.formData.value, [Validators.required, ValueValidator]],
              frequency: [this.data.formData.frequency, Validators.required],
              received: [this.data.formData.received],
              description: [this.data.formData.description],
              receivedFrom: [this.data.formData.receivedFrom],
              receivedIn: [this.selectedPayment],
              receivedOn: [{value: this.data.formData.receivedOn, disabled: !this.toggler}, Validators.required],
            });
            
          }
          else
          {
          this.itemForm = this.fb.group({
            source: ['', Validators.required],
            value: ['', [Validators.required, ValueValidator]],
            frequency: ['', Validators.required],
            received: [false],
            description: [''],
            receivedFrom: ['', Validators.required],
            receivedIn: ['', Validators.required],
            receivedOn: [{value: '', disabled: !this.toggler}, Validators.required],
          });
        }
        this.cdr.detectChanges();
        // Optional: populate form if data is provided
        if (this.data) {
          this.itemForm.patchValue(this.data);
        }
      },
      error: (e)=> { console.error(e);},
      complete : ()=> {} 
    });

  }

  else if(this.data.component == 'Expense')
  {
    forkJoin({
      frequencies: this.as.getFrequencies(),
      expenseCategoryTypes : this.as.getExpenseCategoryType(),
      userPaymentMethodWrapper: this.as.getUserPaymentMethods(this.user.id),
      defaultPaymentMethods: this.as.getDefaultPaymentMethods()
      }).subscribe(
        {
          next: (res: any) => {

                this.frequencies = res.frequencies;
                this.expenseCategoryTypeWrapper = res.expenseCategoryTypes;
                this.userPaymentMethodWrapper = res.userPaymentMethodWrapper;
                this.defaultPaymentMethods = res.defaultPaymentMethods;
                if (this.userPaymentMethodWrapper?.cash.length)
                {
                  this.defaultPaymentMethods = this.defaultPaymentMethods.filter(x => x.name != "Cash");
                }
                this.cdr.detectChanges();
                if(this.data.formData)
                {
                  if(this.toggler)
                  {
                  this.disablefutureDates = new Date();
                  this.disablepreviousDates = null;
                  }
                  this.expenseTypes = (this.expenseCategoryTypeWrapper.filter((x)=> x.expenseCategory?.id == this.data.formData.expenseCategory.id)[0]).expenseTypes;
                  this.selectedPayment = this.getCurrentPaymentMethod(this.data.formData.paidVia.paymentMethod.name, this.data.formData.paidVia.id);
                  this.toggler = this.data.formData.paid;
                  this.itemForm = this.fb.group(
                    {
                      frequency: [this.data.formData.frequency, Validators.required],
                      paid: [this.data.formData.paid, Validators.required],
                      paidTo: [this.data.formData.paidTo, Validators.required],
                      paidVia: [this.selectedPayment, Validators.required],
                      paidOn: [{value: this.data.formData.paidOn, disabled: !this.toggler}, Validators.required],
                      value: [this.data.formData.value, ValueValidator],
                      description: [this.data.formData.description, Validators.required],
                      expenseType: [this.data.formData.expenseType, Validators.required],
                      expenseCategory: [this.data.formData.expenseCategory, Validators.required],
                    }
                  );
                }
                else
                {
                  this.itemForm = this.fb.group(
                    {
                      frequency: ['', Validators.required],
                      paid: [this.toggler, Validators.required],
                      paidTo: ['', Validators.required],
                      paidVia: ['', Validators.required],
                      paidOn: [{value:'', disabled: !this.toggler}, Validators.required],
                      value: ['', ValueValidator],
                      description: ['', Validators.required],
                      expenseType: ['', Validators.required],
                      expenseCategory: ['', Validators.required],
                    }
                  );
                }
        this.cdr.detectChanges();
        if (this.data) {
          this.itemForm.patchValue(this.data);
        }
          },
          error: (e)=> this.toastr.error('Something went wrong !'),
          complete: ()=>{}
        }

      );
  }

  else if(this.data.component == "Investment")
  {

    forkJoin({
      frequencies: this.as.getFrequencies(),
      investmentCategoryTypes : this.as.getInvestmentCategoryType(),
      userPaymentMethodWrapper: this.as.getUserPaymentMethods(this.user.id),
      defaultPaymentMethods: this.as.getDefaultPaymentMethods()
      }).subscribe(
        {
          next: (res) => 
          {
            this.frequencies = res.frequencies;
                this.investmentCategoryTypeWrapper = res.investmentCategoryTypes;
                this.userPaymentMethodWrapper = res.userPaymentMethodWrapper;
                this.defaultPaymentMethods = res.defaultPaymentMethods;
                if (this.userPaymentMethodWrapper?.cash.length)
                {
                  this.defaultPaymentMethods = this.defaultPaymentMethods.filter(x => x.name != "Cash");
                }
                this.cdr.detectChanges();
                if(this.data.formData)
                {
                  this.expenseTypes = (this.investmentCategoryTypeWrapper.filter((x)=> x.investmentCategory?.id == this.data.formData.investmentCategory.id)[0]).investmentTypes;
                  this.selectedPayment = this.getCurrentPaymentMethod(this.data.formData.investedVia.paymentMethod.name, this.data.formData.investedVia.id);
                  this.toggler = this.data.formData.invested;
                  if(this.toggler)
                  {
                  this.disablefutureDates = new Date();
                  this.disablepreviousDates = null;
                  }
                  this.itemForm = this.fb.group(
                    {
                      frequency: [this.data.formData.frequency, Validators.required],
                      invested: [this.data.formData.invested, Validators.required],
                      investedTo: [this.data.formData.investedTo, Validators.required],
                      investedVia: [this.selectedPayment, Validators.required],
                      investedOn: [{value: this.data.formData.investedOn, disabled: !this.toggler}, Validators.required],
                      value: [this.data.formData.value, ValueValidator],
                      description: [this.data.formData.description, Validators.required],
                      investmentType: [this.data.formData.investmentType, Validators.required],
                      investmentCategory: [this.data.formData.investmentCategory, Validators.required],
                      growthRate: [this.data.formData.growthRate, RateValidator],
                      tenure: [this.data.formData.tenure,TenureValidator]
                    }
                  );
                }
                else
                {
                  this.itemForm = this.fb.group(
                    {
                      frequency: ['', Validators.required],
                      invested: [this.toggler, Validators.required],
                      investedTo: ['', Validators.required],
                      investedVia: ['', Validators.required],
                      investedOn: [{value:'', disabled: !this.toggler}, Validators.required],
                      value: ['', ValueValidator],
                      description: ['', Validators.required],
                      investmentType: ['', Validators.required],
                      investmentCategory: ['', Validators.required],
                      growthRate: ['', RateValidator],
                      tenure: ['', TenureValidator]
                    }
                  );
                }
        this.cdr.detectChanges();
        if (this.data) {
          this.itemForm.patchValue(this.data);
        }
          },
          error: (e)=> this.toastr.error('Something went Wrong !'),
          complete: () => {}
        }
      );

  }
      }

}
