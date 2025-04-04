import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormPermisosComponent } from '../form-permisos/form-permisos.component';
import { Permiso } from '../../interfaces/permiso';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-solicitar-permiso',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule, // ✅ Se agrega MatSnackBarModule
  ],
  templateUrl: './solicitar-permiso.component.html',
  styleUrls: ['./solicitar-permiso.component.css'],
})
export class SolicitarPermisoComponent implements OnInit {
  permisos: Permiso[] = [
    {
      tipo_permiso: 'Vacaciones',
      descripcion: 'Permiso para tomar vacaciones.',
      dias: 15,
    },
    {
      tipo_permiso: 'Enfermedad',
      descripcion: 'Permiso por enfermedad o incapacidad.',
      dias: 50,
    },
    {
      tipo_permiso: 'Personal',
      descripcion: 'Permiso para asuntos personales.',
      dias: 3,
    },
  ];
  busquedaId: number | null = null;

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  mostrarMensaje(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      panelClass: ['snack-bar-center']
    });
  }

  solicitarPermiso(permiso: Permiso) {
    const dialogRef = this.dialog.open(FormPermisosComponent, {
      data: { 
        tipo_permiso: permiso.tipo_permiso,
        fecha_solicitud: new Date().toISOString().slice(0, 10)
      },
    });
  }

  solicitarPermisoVacaciones() {
    this.solicitarPermiso(this.permisos[0]);
  }

  solicitarPermisoEnfermedad() {
    this.solicitarPermiso(this.permisos[1]);
  }

  solicitarPermisoPersonal() {
    this.solicitarPermiso(this.permisos[2]);
  }

  buscarPersona(): void {
    if (this.busquedaId !== null) {
      const personaEncontrada = this.permisos.some((permiso) => permiso.dias === this.busquedaId);
      this.mostrarMensaje(
        personaEncontrada ? 'La persona existe en la base de datos.' : 'La persona no existe en la base de datos.'
      );
    } else {
      this.mostrarMensaje('Por favor, ingrese un ID válido.');
    }
  }
}
