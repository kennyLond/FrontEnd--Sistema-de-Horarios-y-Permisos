import { Component } from '@angular/core';

//import de angular material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { Persona } from '../../interfaces/persona';

//import de PIPE
import { CommonModule } from '@angular/common'; // ✅ Importa CommonModule
@Component({
  selector: 'app-list-personas',
  imports: [MatToolbarModule,MatCardModule, MatTableModule, CommonModule],
  templateUrl: './list-personas.component.html',
  styleUrl: './list-personas.component.css'
})
export class ListPersonasComponent {
  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'tipoDocumento', 'documento', 'fechaNacimiento'];
  dataSource = listPersonas;

}


const listPersonas: Persona[] = [
  {nombre:"Kenny", apellido:"Londoño", correo:"kenny@gmail.com", tipoDocumento:"cc", documento:1091675329, fechaNacimiento: new Date()},
];

