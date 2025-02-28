import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';



@Component({
  selector: 'app-agregar-editar-personas',
  standalone: true, // Indica que es un componente independiente
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule,MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './agregar-editar-personas.component.html',
  styleUrl: './agregar-editar-personas.component.css'
})
export class AgregarEditarPersonasComponent {

  tipoDocumento: string[] = ['Cedula de ciudadania', 'Pasaporte'];


  constructor(public dialogRef: MatDialogRef<AgregarEditarPersonasComponent>) {}

  cancelar() {
    this.dialogRef.close();
  }
}
