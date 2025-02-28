
//import de angular material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Persona } from '../../interfaces/persona';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { Component, ViewChild } from '@angular/core';



//import de PIPE
import { CommonModule } from '@angular/common'; // ✅ Importa CommonModule
@Component({
  selector: 'app-list-personas',
  imports: [MatToolbarModule,MatCardModule, MatTableModule, CommonModule,MatPaginatorModule ],
  templateUrl: './list-personas.component.html',
  styleUrl: './list-personas.component.css'
})
export class ListPersonasComponent {
  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'tipoDocumento', 'documento', 'fechaNacimiento'];
  dataSource: MatTableDataSource<Persona>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(){

    this.dataSource = new MatTableDataSource(listPersonas);

  }

  ngOnInit(): void{

  }

  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel = "Items por paginas"
  }

}


const listPersonas: Persona[] = [
  {nombre:"Kenny", apellido:"Londoño", correo:"kenny@gmail.com", tipoDocumento:"cc", documento:1091675329, fechaNacimiento: new Date(),},
  {nombre:"Marcela", apellido:"Paez", correo:"marcela@gmail.com", tipoDocumento:"cc", documento:145675329, fechaNacimiento: new Date()},
  {nombre:"Karen", apellido:"suarez", correo:"karen@gmail.com", tipoDocumento:"cc", documento:104545329, fechaNacimiento: new Date()},
  {nombre:"Marta", apellido:"rodriguez", correo:"marta@gmail.com", tipoDocumento:"cc", documento:1075329, fechaNacimiento: new Date()}
];

