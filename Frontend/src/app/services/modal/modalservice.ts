import {  Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../shared/modal/addoredit/modal-component.js';
import { PaymentMethod } from '../../shared/modal/paymentmethod/paymentmethod.js';
import { Viewdetails } from '../../shared/modal/viewdetails/viewdetails.js';

@Injectable({
  providedIn: 'root'
})
export class Modalservice {

  constructor(private dialog: MatDialog)
  {}

  openIncomeModal()
  {
    const dialogRef = this.dialog.open(ModalComponent, 
        {
          
          height: '95vh',
          width: '50vw',
          maxWidth: '95vw',
          panelClass: 'custom-dialog-container',
          data: 
          {
            component: "Income",
            action: "add",
            title: "Add Income",
        },
      }
      );
  
      return dialogRef.afterClosed();

  }

  openPaymentMethodModal(value: string)
      {
         var dialogRef: any;
        if(value){

          if (value == "Credit Card")
          {
        dialogRef = this.dialog.open(PaymentMethod, 
          {
            
            height: '80vh',
            width: '60vw',
            panelClass: 'custom-dialog-container',
            data: 
            {
              component: value,
              title: "Add new "+value,
            }
        }
        );
      }
      else if (value == "Debit Card")
      {
    dialogRef = this.dialog.open(PaymentMethod, 
      {
        
        height: '80vh',
        width: '60vw',
        panelClass: 'custom-dialog-container',
        data: 
        {
          component: value,
          title: "Add new "+value,
        }
    }
    );
  }
        else if (value == "Bank Transfer")
        {
      dialogRef = this.dialog.open(PaymentMethod, 
        {
          
          height: '80vh',
          width: '60vw',
          panelClass: 'custom-dialog-container',
          data: 
          {
            component: value,
            title: "Add new "+value,
          }
      }
      );
      }

      else if (value == "UPI")
      {
    dialogRef = this.dialog.open(PaymentMethod, 
      {
        
        height: '40vh',
        width: '60vw',
        panelClass: 'custom-dialog-container',
        data: 
        {
          component: value,
          title: "Add new "+value,
        }
    }
    );
    } 
        return dialogRef.afterClosed();
      }
      return ;
  }
    
  

  OpenIncomeViewDetails(row: any)
  {
    const dialogRef = this.dialog.open(Viewdetails, 
      {
        height: '97vh',
        width: '70vw',
        maxWidth: '95vw',
        panelClass: 'custom-dialog-container',
        data: {
          row: row,
          component: 'Income',
          action: 'view'
        }
      }
    );

    return dialogRef.afterClosed();
  }

  OpenExpenseViewDetails(row: any)
  {
    const dialogRef = this.dialog.open(Viewdetails, 
      {
        height: '97vh',
        width: '70vw',
        maxWidth: '95vw',
        panelClass: 'custom-dialog-container',
        data: {
          row: row,
          component: 'Expense'
        }
      }
    );

    return dialogRef.afterClosed();
  }

  OpenInvestmentViewDetails(row: any)
  {
    const dialogRef = this.dialog.open(Viewdetails, 
      {
        height: '97vh',
        width: '70vw',
        maxWidth: '95vw',
        panelClass: 'custom-dialog-container',
        data: {
          row: row,
          component: 'Investment'
        }
      }
    );

    return dialogRef.afterClosed();
  }

  
  EditIncomeModal(row : any)
  {
    const dialogRef = this.dialog.open(ModalComponent, 
      {
        height: '95vh',
        width: '50vw',
        maxWidth: '95vw',
        panelClass: 'custom-dialog-container',
        data: 
        {
          component: "Income",
          action: "edit",
          title: "Edit Income",
          formData: {
            source: row.source,
            frequency: row.frequency,
            incomeType: row.incomeType,
            receivedFrom: row.receivedFrom,
            received: row.received,
            receivedIn: row.receivedIn,
            receivedOn: row.receivedOn,
            value: row.value,
            description: row.description
          }
      },
    }
    );

    return dialogRef.afterClosed();
  }


  openExpenseModal()
  {
    const dialogRef = this.dialog.open(ModalComponent, 
        {
          
          height: '95vh',
          width: '50vw',
          maxWidth: '95vw',
          panelClass: 'custom-dialog-container',
          data: 
        {
          component: "Expense",
          action: "add",
          title: "Add Expense"
        }
      }
      );
  
      return dialogRef.afterClosed();
    
  }

  openInvestmentModal()
  {
    const dialogRef = this.dialog.open(ModalComponent, 
        {
          
          height: '95vh',
          width: '50vw',
          maxWidth: '95vw',
          panelClass: 'custom-dialog-container',
          data: 
        {
          component: "Investment",
          action: "add",
          title: "Add New Investment"
        }
      }
      );
  
      return dialogRef.afterClosed();
    
  }

  openDeleteExpenseModal(row:any)
  {
    const dialogRef = this.dialog.open(ModalComponent, 
      {
        
        height: '40vh',
        width: '40w',
        maxHeight: '90vh',
        panelClass: 'custom-dialog-container',
        data: 
        {
          component: "Expense",
          action: "delete",
          title: "Delete Expense",
          deleteData: {
            expense: row.id
          }
      },
    }
    );

    return dialogRef.afterClosed();
  }

  openDeleteInvestmentModal(row:any)
  {
    const dialogRef = this.dialog.open(ModalComponent, 
      {
        
        height: '40vh',
        width: '40w',
        maxHeight: '90vh',
        panelClass: 'custom-dialog-container',
        data: 
        {
          component: "Investment",
          action: "delete",
          title: "Delete Investment",
          deleteData: {
            investment: row.id
          }
      },
    }
    );

    return dialogRef.afterClosed();
  }


  openDeleteIncomeModal(row:any)
  {
    const dialogRef = this.dialog.open(ModalComponent, 
      {
        
        height: '40vh',
        width: '40w',
        maxHeight: '90vh',
        panelClass: 'custom-dialog-container',
        data: 
        {
          component: "Income",
          action: "delete",
          title: "Delete Income",
          deleteData: {
            income: row.id
          }
      },
    }
    );

    return dialogRef.afterClosed();
  }


  EditExpenseModal(row : any)
  {
    const dialogRef = this.dialog.open(ModalComponent, 
      {
        
        height: '90vh',
        width: '40vw',
        maxWidth: '60vw',
        panelClass: 'custom-dialog-container',
        data: 
        {
          component: "Expense",
          action: "edit",
          title: "Edit Expense",
          formData: {
            frequency: row.frequency,
            invested: row.invested,
            investedTo: row.investedTo,
            investedVia: row.investedVia,
            investedOn: row.investedOn,
            value: row.value,
            description: row.description,
            expenseType: row.expenseType,
            expenseCategory: row.expenseCategory,
          }
      },
    }
    );

    return dialogRef.afterClosed();
  }

  EditInvestmentModal(row : any)
  {
    const dialogRef = this.dialog.open(ModalComponent, 
      {
        
        height: '90vh',
        width: '40vw',
        maxWidth: '60vw',
        panelClass: 'custom-dialog-container',
        data: 
        {
          component: "Investment",
          action: "edit",
          title: "Edit Investment",
          formData: {
            frequency: row.frequency,
            invested: row.invested,
            investedTo: row.investedTo,
            investedVia: row.investedVia,
            investedOn: row.investedOn,
            value: row.value,
            description: row.description,
            investmentType: row.investmentType,
            investmentCategory: row.investmentCategory,
            growthRate: row.growthRate,
            tenure: row.tenure
          }
      },
    }
    );

    return dialogRef.afterClosed();
  }
}
