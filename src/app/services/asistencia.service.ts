import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Asistencia } from '../interfaces/asistencia';

@Injectable({
    providedIn: 'root'
})
export class AsistenciaService {
    private apiUrl = 'http://localhost:3000/api/asistencias';
    private http = inject(HttpClient);

    // Obtener una asistencia por persona_id
    obtenerAsistenciaPorId(personaId: number): Observable<Asistencia> {
        return this.http.get<Asistencia>(`${this.apiUrl}/${personaId}`).pipe(
            catchError(error => {
                console.error('Error al obtener asistencia:', error);
                return throwError(() => new Error('No se encontró asistencia para el ID proporcionado.'));
            })
        );
    }

    // Obtener todas las asistencias (opcional)
    obtenerAsistencias(): Observable<Asistencia[]> {
        return this.http.get<Asistencia[]>(this.apiUrl).pipe(
            catchError(error => {
                console.error('Error al obtener todas las asistencias:', error);
                return throwError(() => new Error('Error al obtener la lista de asistencias.'));
            })
        );
    }

    // Registrar la hora de entrada
    registrarEntrada(asistencia: Asistencia): Observable<any> {
        return this.http.post(`${this.apiUrl}/entrada`, asistencia).pipe(
            catchError(error => {
                console.error('Error al registrar la entrada:', error);
                return throwError(() => new Error('No se pudo registrar la hora de entrada.'));
            })
        );
    }

    // Registrar la hora de salida
    registrarSalida(personaId: number): Observable<any> {
        return this.http.put(`${this.apiUrl}/salida/${personaId}`, {}).pipe(
            catchError(error => {
                console.error('Error al registrar la salida:', error);
                return throwError(() => new Error('No se pudo registrar la hora de salida.'));
            })
        );
    }
}
