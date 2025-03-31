import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common'; // No olvides agregar CommonModule si estás utilizando *ngFor

@Component({
  selector: 'app-solicitar-permiso',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule], // Solo importamos lo necesario
  templateUrl: './solicitar-permiso.component.html',
  styleUrls: ['./solicitar-permiso.component.css']
})
export class SolicitarPermisoComponent {
  // Arreglo de permisos con diferentes tipos de permiso
  permisos = [
    { tipoPermiso: 'Vacaciones', descripcion: 'Solicitud de vacaciones anuales.', dias: 15 },
    { tipoPermiso: 'Enfermedad', descripcion: 'Permiso por enfermedad.', dias: 5 },
    { tipoPermiso: 'Familiar', descripcion: 'Permiso por asuntos familiares.', dias: 7 }
  ];

  solicitarPermiso(permiso: any) {
    // Implementa la lógica para solicitar el permiso aquí
    console.log(`Permiso solicitado: ${permiso.tipoPermiso}`);
  }
}
