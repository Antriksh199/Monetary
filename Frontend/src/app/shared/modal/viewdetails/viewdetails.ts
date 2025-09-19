import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { Adminservice } from '../../../services/admin/adminservice.js';
import { UserPaymentMethodWrapper } from '../../../models/Admin/UserPaymentMethodWrapper.js';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth/auth-service.js';



@Component({
  selector: 'app-viewdetails',
  imports: [MatCardModule, MatDividerModule, CommonModule, MatDialogContent, MatDialogActions, MatDialogModule, MatButtonModule],
  templateUrl: './viewdetails.html',
  styleUrl: './viewdetails.css'
})
export class Viewdetails implements OnInit
{

  userPaymentMethodWrapper?: UserPaymentMethodWrapper;
  currentPaymentMethod: any;
  user: any
  date: Date = new Date();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private adminService: Adminservice, private cdr: ChangeDetectorRef
  ,private authService: AuthService ) {
    this.user = this.authService.getCurrentUser();
  }



  getCurrentPaymentMethod(name: string, id: number)
      {
        if(this.userPaymentMethodWrapper && this.data.row && name)
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
  ngOnInit(): void {

    this.adminService.getUserPaymentMethods(this.user.id).subscribe(
      {
        next: (res)=>
        {
          if(res)
          {
            this.userPaymentMethodWrapper = res;
            if(this.data.component == 'Income')
            {
            this.currentPaymentMethod = this.getCurrentPaymentMethod(this.data.row.receivedIn.paymentMethod.name, this.data.row.receivedIn.id);
            }
            else if (this.data.component == 'Expense')
            {
              this.currentPaymentMethod = this.getCurrentPaymentMethod(this.data.row.paidVia.paymentMethod.name, this.data.row.paidVia.id);
            }
            else
            {
              this.currentPaymentMethod = this.getCurrentPaymentMethod(this.data.row.investedVia.paymentMethod.name, this.data.row.investedVia.id);
            }
            this.cdr.detectChanges();
          }
        }

      });
  }
  

}
