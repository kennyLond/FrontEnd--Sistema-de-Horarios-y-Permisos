import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

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
  selectedFile: File | null = null;

  get permisosFiltrados() {
    return this.busquedaId ? this.permisos.filter(permiso => permiso.id === this.busquedaId) : this.permisos;
  }

  solicitarPermiso(permiso: any) {
    console.log(`Permiso solicitado: ${permiso.tipoPermiso}`);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log('Archivo seleccionado:', this.selectedFile);
  }
}