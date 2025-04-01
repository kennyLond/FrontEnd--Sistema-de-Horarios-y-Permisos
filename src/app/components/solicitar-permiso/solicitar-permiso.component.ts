import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog'; // Importamos MatDialog
import { FormPermisosComponent } from '../form-permisos/form-permisos.component'; // Importamos el componente de formulario

@Component({
  selector: 'app-solicitar-permiso',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './solicitar-permiso.component.html',
  styleUrls: ['./solicitar-permiso.component.css']
})
export class SolicitarPermisoComponent {
  permisos = [
    { id: 1, tipoPermiso: 'Vacaciones', descripcion: 'Solicitud de vacaciones anuales.', dias: 15 },
    { id: 2, tipoPermiso: 'Enfermedad', descripcion: 'Permiso por enfermedad.', dias: 5 },
    { id: 3, tipoPermiso: 'Familiar', descripcion: 'Permiso por asuntos familiares.', dias: 7 }
  ];

  busquedaId: number | null = null;

  constructor(private dialog: MatDialog) {} // Inyectamos MatDialog

  get permisosFiltrados() {
    return this.busquedaId ? this.permisos.filter(permiso => permiso.id === this.busquedaId) : this.permisos;
  }

  solicitarPermiso(permiso: any) {
    // Abrimos el diálogo y pasamos los datos del permiso
    const dialogRef = this.dialog.open(FormPermisosComponent, {
      data: permiso // Pasamos los datos al formulario
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Formulario cerrado con éxito');
      } else {
        console.log('Formulario cerrado sin cambios');
      }
    });
  }
}
