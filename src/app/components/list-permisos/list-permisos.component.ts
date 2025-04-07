import { Component, ViewChild, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
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

import { PermisosService } from '../../services/permisos.service';
import { Permiso } from '../../interfaces/permiso';
import { SolicitarPermisoComponent } from '../../components/solicitar-permiso/solicitar-permiso.component';

@Component({
  selector: 'app-list-permisos',
  standalone: true,
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
    MatSnackBarModule,
    SolicitarPermisoComponent,
  ],
  templateUrl: './list-permisos.component.html',
  styleUrls: ['./list-permisos.component.css']
})
export class ListPermisosComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'nombre',
    'apellido',
    'tipo_permiso',
    'estado_permiso',
    'documento',
    'fecha_solicitud',
    'dias',
    'acciones'
  ];
  dataSource: MatTableDataSource<Permiso> = new MatTableDataSource<Permiso>();
  loading: boolean = false;
  private intervaloActualizacion: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private permisoService: PermisosService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.obtenerPermisos();
    this.intervaloActualizacion = setInterval(() => {
      this.obtenerPermisos();
    }, 10000);
  }

  ngAfterViewInit(): void {
    if (this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator._intl.itemsPerPageLabel = 'Ítems por página';
    }
  }

  ngOnDestroy(): void {
    if (this.intervaloActualizacion) {
      clearInterval(this.intervaloActualizacion);
    }
  }

  obtenerPermisos(): void {
    this.loading = true;
    this.permisoService.obtenerPermisos().subscribe({
      next: (data: Permiso[]) => {
        this.loading = false;
        this.dataSource.data = data;
      },
      error: () => {
        this.loading = false;
        this.mostrarMensaje('Error al cargar los permisos');
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

  openSolicitarPermisoDialog(): void {
    const dialogRef = this.dialog.open(SolicitarPermisoComponent, {
      width: '550px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.obtenerPermisos();
      }
    });
  }

  private mostrarMensaje(mensaje: string): void {
    this.snackBar.open(mensaje, '', { duration: 2000 });
  }

  descargarArchivo(nombreArchivo: string) {
    const url = `http://localhost:3000/api/permisos/descargar/${nombreArchivo}`;
    const link = document.createElement('a');
    link.href = url;
    link.download = nombreArchivo;
    link.target = '_blank';
    link.click();
  }


  cambiarEstado(id: number, nuevoEstado: string): void {
    const estadoEnMayusculas = nuevoEstado.toUpperCase(); // Convierte a mayúsculas
    this.permisoService.actualizarEstadoPermiso(id, estadoEnMayusculas).subscribe({
      next: () => {
        this.mostrarMensaje(`Permiso ${nuevoEstado}`);
        this.obtenerPermisos(); // Refresca la tabla
      },
      error: () => {
        this.mostrarMensaje('Error al cambiar el estado del permiso');
      }
    });
  }
  
}