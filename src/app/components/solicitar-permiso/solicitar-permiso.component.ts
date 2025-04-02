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
      dias: 50, // o un valor por defecto
    },
    {
      tipo_permiso: 'Personal',
      descripcion: 'Permiso para asuntos personales.',
      dias: 3,
    },
  ];
  busquedaId: number | null = null;
  mensajeConfirmacion: string = '';

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    // No necesitas cargar permisos del servicio aquí
  }

  solicitarPermiso(permiso: Permiso) {
    const dialogRef = this.dialog.open(FormPermisosComponent, {
      data: permiso,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Formulario cerrado con éxito');
      } else {
        console.log('Formulario cerrado sin cambios');
      }
    });
  }

  solicitarPermisoVacaciones() {
    const permiso = this.permisos[0]; // Permiso de vacaciones
    this.solicitarPermiso(permiso);
  }

  solicitarPermisoEnfermedad() {
    const permiso = this.permisos[1]; // Permiso de enfermedad
    this.solicitarPermiso(permiso);
  }

  solicitarPermisoPersonal() {
    const permiso = this.permisos[2]; // Permiso personal
    this.solicitarPermiso(permiso);
  }

  buscarPersona(): void {
    if (this.busquedaId !== null) {
      const personaEncontrada = this.permisos.some((permiso) => permiso.id === this.busquedaId);
      this.mensajeConfirmacion = personaEncontrada
        ? 'La persona existe en la base de datos.'
        : 'La persona no existe en la base de datos.';
    } else {
      this.mensajeConfirmacion = 'Por favor, ingrese un ID válido.';
    }
  }
}