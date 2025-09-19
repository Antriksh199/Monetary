import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { IncomeComponent } from '../components/income-component/income-component.js';

const routes: Route[] = [
  { path: '', component: IncomeComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class IncomeRoutingModule {
 }
