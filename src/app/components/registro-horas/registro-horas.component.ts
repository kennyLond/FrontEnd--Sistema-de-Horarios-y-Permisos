import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsistenciaService } from '../../services/asistencia.service';
import { Asistencia } from '../../interfaces/asistencia';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registro-horas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
  ],
  templateUrl: './registro-horas.component.html',
  styleUrls: ['./registro-horas.component.css']
})
export class RegistroHorasComponent implements OnInit {
  personaId: number | null = null;
  dataSource = new MatTableDataSource<Asistencia>([]);
  displayedColumns: string[] = ['nombre', 'apellido', 'hora_entrada', 'hora_salida'];
  loading = false;

  private asistenciaService = inject(AsistenciaService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.cargarAsistencias(); // Cargar asistencias al inicializar el componente
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  cargarAsistencias(): void {
    this.loading = true;
    this.asistenciaService.obtenerAsistencias().subscribe(
      (data) => {
        this.dataSource.data = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error al cargar asistencias:', error);
        alert('Ocurrió un error al cargar las asistencias.');
        this.loading = false;
      }
    );
  }

  buscarAsistencia(): void {
    if (!this.personaId) {
      alert('Ingrese un ID válido');
      return;
    }

    this.loading = true;
    this.asistenciaService.obtenerAsistenciaPorId(this.personaId).subscribe(
      (data) => {
        if (data) {
          this.dataSource.data = [data];
        } else {
          alert('No se encontró asistencia.');
          this.dataSource.data = [];
        }
        this.loading = false;
      },
      (error) => {
        console.error('Error al obtener asistencia:', error);
        alert('Ocurrió un error al buscar la asistencia.');
        this.dataSource.data = [];
        this.loading = false;
      }
    );
  }

  registrarEntrada(): void {
    if (!this.personaId) {
      alert('Ingrese un ID válido antes de registrar la entrada.');
      return;
    }

    const nuevaAsistencia: Asistencia = {
      persona_id: this.personaId,
      nombre: 'Nombre dinámico',
      apellido: 'Apellido dinámico',
      hora_entrada: new Date().toISOString(),
      hora_salida: null
    };

    this.asistenciaService.registrarEntrada(nuevaAsistencia).subscribe(
      () => {
        alert('Entrada registrada con éxito.');
        this.buscarAsistencia();
      },
      (error) => {
        if (error instanceof HttpErrorResponse && error.status === 409) {
          alert('El empleado ya ha registrado sus horas.');
        } else {
          alert('Error al registrar la entrada.');
        }
      }
    );
  }

  registrarSalida(): void {
    if (!this.personaId) {
      alert('Debe buscar primero una asistencia válida.');
      return;
    }

    this.asistenciaService.registrarSalida(this.personaId).subscribe(() => {
      alert('Salida registrada con éxito.');
      this.buscarAsistencia();
    });
  }

  applyFilter(event: Event): void {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.replace(/\s+/g, '').toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // Función para formatear la hora con AM/PM
  formatTime(dateTimeString: string | null | undefined): string {
    if (!dateTimeString) {
      return '---';
    }
    const date = new Date(dateTimeString);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // la hora '0' debe ser '12'
    return `${hours}:${minutes} ${ampm}`;
  }
}