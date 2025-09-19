import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { AuthService } from '../../services/auth/auth-service.js';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatToolbar, MatIconModule, CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {

  user: any;
  date: Date = new Date();
  constructor(private au: AuthService) {
    this.user = this.au.getCurrentUser();
  }

}
