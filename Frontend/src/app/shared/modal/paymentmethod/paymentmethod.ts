import { Component, Inject, OnInit, ChangeDetectorRef , AfterViewInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl  } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IncomeService } from '../../../services/income/income-service.js';
import { MatSelectModule } from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { Adminservice } from '../../../services/admin/adminservice.js';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule, MatMenu } from '@angular/material/menu';
import { User } from '../../../models/Admin/user.js';
import { NameValidator, CardNumberValidator, CvvValidator, CardExpiryValidator, ProviderValidator, BankNameValidator, AccountNumberValidator
, UPIValidator, IFSCValidator } from '../../validators/paymentmethod.js';

@Component({
  selector: 'app-paymentmethod',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatMenuModule, ReactiveFormsModule, MatIconModule, MatSlideToggleModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, ],
  templateUrl: './paymentmethod.html',
  styleUrl: './paymentmethod.css'
})
export class PaymentMethod {
  itemForm: any;
  user: User = new User();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fs: IncomeService,
        private cdr: ChangeDetectorRef,
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<PaymentMethod>,
        private as: Adminservice,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.itemForm.valid) {
      this.dialogRef.close(this.itemForm.value);
    } else {
      this.itemForm.updateValueAndValidity(); 
      this.itemForm.markAllAsTouched();
       // triggers validation messages
    }
  }

  ngAfterViewInit(){
    this.cdr.detectChanges();
  }


  ngOnInit()
  {

    switch(this.data.component)
    {
      case "Credit Card":
        this.itemForm = this.fb.group(
          {
            name: ['', [Validators.minLength(6), Validators.maxLength(20) ,NameValidator]],
            cardNumber: ['', [Validators.minLength(4), Validators.maxLength(4) ,CardNumberValidator]],
            cvv: ['', [CvvValidator]],
            expiryDate: ['', CardExpiryValidator],
            provider: ['', [Validators.minLength(6), Validators.maxLength(20) ,ProviderValidator]]
          }
        );
        break;

        case "Debit Card":
          this.itemForm = this.fb.group(
            {
              name: ['', [Validators.minLength(6), Validators.maxLength(20) ,NameValidator]],
              cardNumber: ['', [Validators.minLength(4), Validators.maxLength(4) ,CardNumberValidator]],
              cvv: ['', [CvvValidator]],
              expiryDate: ['', CardExpiryValidator],
              provider: ['', [Validators.minLength(6), Validators.maxLength(20) ,ProviderValidator]]
            }
          );
          break;

          case "Bank Transfer":
            this.itemForm = this.fb.group(
              {
                bank: ['', [Validators.minLength(3), Validators.maxLength(20) ,BankNameValidator]],
                accountNumber: ['', [Validators.minLength(9), Validators.maxLength(18) ,AccountNumberValidator]],
                accountType: ['', Validators.required],
                ifsc: ['', [Validators.minLength(6), Validators.maxLength(12),IFSCValidator]]
              }
            );
            break;

            case "UPI":
            this.itemForm = this.fb.group(
              {
                upiid: ['', [Validators.minLength(6), Validators.maxLength(20) ,UPIValidator]]
              }
            );
            break;
            


    }
      
      }
    

  }

  


