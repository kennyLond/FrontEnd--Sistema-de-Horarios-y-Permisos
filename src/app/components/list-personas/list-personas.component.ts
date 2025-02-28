// Importaciones de Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Component, ViewChild, AfterViewInit } from '@angular/core';

// Importación de CommonModule
import { CommonModule } from '@angular/common'; 
import { Persona } from '../../interfaces/persona';

@Component({
  selector: 'app-list-personas',
  standalone: true,
  imports: [MatToolbarModule, MatCardModule, MatTableModule, CommonModule, MatPaginatorModule, MatSortModule],
  templateUrl: './list-personas.component.html',
  styleUrls: ['./list-personas.component.css'] // 🔹 Corregido "styleUrls"
})
export class ListPersonasComponent implements AfterViewInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'tipoDocumento', 'documento', 'fechaNacimiento'];
  dataSource: MatTableDataSource<Persona>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; // 🔹 Declarado correctamente fuera del constructor

  constructor() {
    this.dataSource = new MatTableDataSource(listPersonas);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator._intl.itemsPerPageLabel = "Ítems por página";
  }
}

// Datos de ejemplo
const listPersonas: Persona[] = [
  { nombre: "Kenny", apellido: "Londoño", correo: "kenny@gmail.com", tipoDocumento: "CC", documento: 1091675329, fechaNacimiento: new Date() },
  { nombre: "Marcela", apellido: "Paez", correo: "marcela@gmail.com", tipoDocumento: "CC", documento: 145675329, fechaNacimiento: new Date() },
  { nombre: "Karen", apellido: "Suarez", correo: "karen@gmail.com", tipoDocumento: "CC", documento: 104545329, fechaNacimiento: new Date() },
  { nombre: "Marta", apellido: "Rodríguez", correo: "marta@gmail.com", tipoDocumento: "CC", documento: 1075329, fechaNacimiento: new Date() }
];
