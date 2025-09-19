import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ExpenseComponent } from '../components/expense-component/expense-component.js';


const routes: Route[] = [
  { path: '', component: ExpenseComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ExpenditureRoutingModule { 


}
