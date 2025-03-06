import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { ListPersonasComponent } from "./components/list-personas/list-personas.component";


@Component({
  selector: 'app-root',
  standalone:true,
  imports: [ MatSlideToggleModule, ListPersonasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FronTEndCRUD';
}
