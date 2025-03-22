import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { PermisoService } from '../../services/permisos.service';
import { Permiso } from '../../interfaces/permiso';

@Component({
  selector: 'app-permiso',
  standalone: true,
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule
  ],
  providers: [PermisoService] // Proporciona el servicio aquí
})
export class PermisoComponent implements OnInit {
  permisos: Permiso[] = [
    { id: 1, idPersona: 101, tipoPermiso: 'Enfermedad', estado: 'pendiente' },
    { id: 2, idPersona: 102, tipoPermiso: 'Vacaciones', estado: 'pendiente' },
    { id: 3, idPersona: 103, tipoPermiso: 'Día Personal', estado: 'pendiente' }
  ];

  displayedColumns: string[] = ['id', 'tipoPermiso', 'estado'];
  dataSource = new MatTableDataSource<Permiso>();

  @ViewChild('input') input!: HTMLInputElement;

  constructor(private permisoService: PermisoService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.obtenerPermisos();
  }

  obtenerPermisos(): void {
    this.permisoService.getPermisos().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: () => {
        this.mostrarMensaje('Error al cargar los permisos');
      }
    });
  }

  solicitarPermiso(permiso: Permiso): void {
    const nuevoPermiso: Permiso = {
      ...permiso,
      estado: 'pendiente' as 'pendiente' // Forzar el tipo correcto
    };

    this.permisoService.solicitarPermiso(nuevoPermiso).subscribe({
      next: () => {
        this.obtenerPermisos();
        this.mostrarMensaje('Permiso solicitado con éxito');
      },
      error: () => {
        this.mostrarMensaje('Error al solicitar el permiso');
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  private mostrarMensaje(mensaje: string): void {
    this.snackBar.open(mensaje, '', { duration: 2000 });
  }
}