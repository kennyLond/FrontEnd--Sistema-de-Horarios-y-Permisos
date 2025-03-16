// Importaciones de Angular y Angular Material
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Persona } from '../../interfaces/persona';
import { AgregarEditarPersonasComponent } from '../agregar-editar-personas/agregar-editar-personas.component';
import { PersonaService } from '../../services/persona.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-list-personas',
  standalone: true,
  imports: [
    CommonModule, MatToolbarModule, MatCardModule, MatTableModule, 
    MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, 
    MatIconModule, MatTooltipModule, MatButtonModule, MatDialogModule, 
    MatProgressBarModule, MatSnackBarModule,NavbarComponent
  ],
  templateUrl: './list-personas.component.html',
  styleUrls: ['./list-personas.component.css']
})
export class ListPersonasComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'tipoDocumento', 'documento', 'fechaNacimiento', 'acciones'];
  dataSource: MatTableDataSource<Persona> = new MatTableDataSource();
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog, 
    private personaService: PersonaService, 
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.obtenerPersonas();
  }

  ngAfterViewInit(): void {
    if (this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator._intl.itemsPerPageLabel = "Ítems por página";
    }
  }

  obtenerPersonas(): void {
    this.loading = true;
    this.personaService.getPersonas().subscribe({
      next: (data) => {
        this.loading = false;
        this.dataSource.data = data;
        this.asignarPaginadorOrdenador();
      },
      error: () => {
        this.loading = false;
        this.mostrarMensaje('Error al cargar los datos');
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addEditPersona(id?: number): void {
    const dialogRef = this.dialog.open(AgregarEditarPersonasComponent, {
      width: '550px',
      disableClose: true,
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.obtenerPersonas();
      }
    });
  }

  deletePersona(id: number): void {
    this.loading = true;
    this.personaService.deletePersona(id).subscribe({
      next: () => {
        this.loading = false;
        this.obtenerPersonas();
        this.mostrarMensaje('La persona fue eliminada con éxito');
      },
      error: () => {
        this.loading = false;
        this.mostrarMensaje('Error al eliminar la persona');
      }
    });
  }

  private mostrarMensaje(mensaje: string): void {
    this.snackBar.open(mensaje, '', { duration: 2000 });
  }

  private asignarPaginadorOrdenador(): void {
    if (this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
}
