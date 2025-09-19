import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { InvestmentComponent } from '../components/investment-component/investment-component.js';

const routes: Route[] = [
  { path: '', component: InvestmentComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class InvestmentRoutingModule {
 }
