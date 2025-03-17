import { Component } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RouterModule } from '@angular/router'; // Importa RouterModule

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [NavbarComponent, RouterModule],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.css'
})
export class LayoutComponent {
}