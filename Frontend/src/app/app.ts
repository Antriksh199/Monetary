import { Component, signal, OnInit } from '@angular/core';
import { IncomeRoutingModule } from "./income/income-routing/income-routing-module.js";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IncomeRoutingModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('Monetary');

}
