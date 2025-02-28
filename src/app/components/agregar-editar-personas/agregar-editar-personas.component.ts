import { Component, OnInit } from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-agregar-editar-personas',
  imports: [MatDialogModule,MatButtonModule ],
  templateUrl: './agregar-editar-personas.component.html',
  styleUrl: './agregar-editar-personas.component.css'
})
export class AgregarEditarPersonasComponent {

  constructor(public dialogRef: MatDialogRef<AgregarEditarPersonasComponent>){

  }

cancelar(){
  this.dialogRef.close();
}
}
