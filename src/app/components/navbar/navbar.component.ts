import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Agregar esto

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterModule], 
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }


}
