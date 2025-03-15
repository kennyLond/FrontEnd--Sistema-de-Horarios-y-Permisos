import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatSlideToggleModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // ✅ CORREGIDO: "styleUrls" en plural
})
export class AppComponent {
  title = 'FronTEndCRUD';
}
