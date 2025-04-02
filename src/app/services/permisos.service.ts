import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  private apiUrl = 'http://localhost:3000/api/permisos'; // URL del backend
  private personaApiUrl = 'http://localhost:3000/api/personas'; // Endpoint para verificar personas

  constructor(private http: HttpClient) { }

  obtenerPermisos(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError(error => this.handleError(error))
    );
  }

  verificarPersona(id: number): Observable<boolean> {
    if (!id || id <= 0) {
      return throwError(() => new Error('ID de persona inválido.'));
    }

    return this.http.get<boolean>(`${this.personaApiUrl}/${id}`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  crearPermiso(permiso: any): Observable<any> {
    if (!permiso) {
      return throwError(() => new Error('Datos del permiso no proporcionados.'));
    }

    return this.http.post<any>(this.apiUrl, permiso).pipe(
      catchError(error => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Algo salió mal; por favor intente nuevamente más tarde.';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del backend
      switch (error.status) {
        case 400:
          errorMessage = 'Solicitud incorrecta. Verifique los datos enviados.';
          break;
        case 404:
          errorMessage = 'La persona no existe.';
          break;
        case 409:
          errorMessage = 'Ya existe un permiso de este tipo para esta persona.';
          break;
        case 500:
          errorMessage = 'Error interno del servidor. Intente más tarde.';
          break;
        default:
          errorMessage = error.error?.message || errorMessage;
          break;
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}
