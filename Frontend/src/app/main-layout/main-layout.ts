import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth-service.js';
import { Header } from '../shared/header/header.js';
import { Footer } from '../shared/footer/footer.js';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from '../shared/loading-component/loading-component.js';

@Component({
  selector: 'app-main-layout',
  imports: [RouterModule, Header, Footer, LoadingComponent],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayout implements OnInit{

  private au = inject(AuthService);
  user: any;

  ngOnInit(): void {
    this.user = this.au.getCurrentUser();
  }

}
