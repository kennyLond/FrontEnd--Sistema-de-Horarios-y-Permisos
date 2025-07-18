<<<<<<< HEAD
// Importaciones de Angular y Angular Material
=======
// IMPORTACIONES
>>>>>>> d2fa9c1 (Initial commit)
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
<<<<<<< HEAD
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
=======
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
>>>>>>> d2fa9c1 (Initial commit)
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Persona } from '../../interfaces/persona';
import { PersonaService } from '../../services/persona.service';
import { AgregarEditarPersonasComponent } from '../agregar-editar-personas/agregar-editar-personas.component';

<<<<<<< HEAD
=======

// ✅ PRIMERO: ConfirmDialogComponent (debe ir antes de usarlo)
@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  template: `
    <h2 mat-dialog-title>Confirmar</h2>
    <mat-dialog-content>¿Estás seguro de que deseas eliminar este registro?</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="dialogRef.close(false)">No</button>
      <button mat-button color="warn" (click)="dialogRef.close(true)">Sí</button>
    </mat-dialog-actions>
  `,
  imports: [CommonModule, MatDialogModule, MatButtonModule]
})
export class ConfirmDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {}
}


// ✅ DESPUÉS: ListPersonasComponent
>>>>>>> d2fa9c1 (Initial commit)
@Component({
  selector: 'app-list-personas',
  standalone: true,
  templateUrl: './list-personas.component.html',
  styleUrls: ['./list-personas.component.css'],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressBarModule,
<<<<<<< HEAD
    MatSnackBarModule
=======
    MatSnackBarModule,
    AgregarEditarPersonasComponent,
    ConfirmDialogComponent // Ahora sí está declarado antes
>>>>>>> d2fa9c1 (Initial commit)
  ]
})
export class ListPersonasComponent implements OnInit, AfterViewInit {

<<<<<<< HEAD
  // Columnas a mostrar
=======
>>>>>>> d2fa9c1 (Initial commit)
  displayedColumns: string[] = [
    'nombre', 'apellido', 'correo',
    'tipoDocumento', 'num_documento',
    'fechaNacimiento', 'acciones'
  ];

<<<<<<< HEAD
  // Fuente de datos de la tabla
=======
>>>>>>> d2fa9c1 (Initial commit)
  dataSource = new MatTableDataSource<Persona>();
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private personaService: PersonaService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.obtenerPersonas();
  }

  ngAfterViewInit(): void {
    this.configurarPaginadorYOrdenador();
  }

  obtenerPersonas(): void {
    this.loading = true;
<<<<<<< HEAD

=======
>>>>>>> d2fa9c1 (Initial commit)
    this.personaService.getPersonas().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.loading = false;
        this.configurarPaginadorYOrdenador();
      },
      error: () => {
        this.loading = false;
        this.mostrarMensaje('⚠️ Error al cargar los datos');
      }
    });
  }

  applyFilter(event: Event): void {
    const filtro = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filtro;
<<<<<<< HEAD

=======
>>>>>>> d2fa9c1 (Initial commit)
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

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.obtenerPersonas();
      }
    });
  }

  deletePersona(id: number): void {
<<<<<<< HEAD
    this.loading = true;

    this.personaService.deletePersona(id).subscribe({
      next: () => {
        this.loading = false;
        this.mostrarMensaje('✅ Persona eliminada con éxito');
        this.obtenerPersonas();
      },
      error: () => {
        this.loading = false;
        this.mostrarMensaje('❌ Error al eliminar la persona');
=======
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe((confirmado: boolean) => {
      if (confirmado) {
        this.loading = true;
        this.personaService.deletePersona(id).subscribe({
          next: () => {
            this.loading = false;
            this.mostrarMensaje('✅ Persona eliminada con éxito');
            this.obtenerPersonas();
          },
          error: () => {
            this.loading = false;
            this.mostrarMensaje('❌ Error al eliminar la persona');
          }
        });
>>>>>>> d2fa9c1 (Initial commit)
      }
    });
  }

  private mostrarMensaje(mensaje: string): void {
    this.snackBar.open(mensaje, '', {
      duration: 2500,
      panelClass: ['snackbar-style']
    });
  }

  private configurarPaginadorYOrdenador(): void {
    if (this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator._intl.itemsPerPageLabel = "Ítems por página";
    }
  }
}
