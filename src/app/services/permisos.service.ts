import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {
  private apiUrl = 'http://localhost:3000/api/permisos';
  private personaApiUrl = 'http://localhost:3000/api/personas';

  constructor(private http: HttpClient) {}

  // Obtener permisos
  obtenerPermisos(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // Verificar si una persona existe por su ID
  verificarPersona(id: number): Observable<boolean> {
    if (!id || id <= 0) {
      return throwError(() => new Error('ID de persona inválido.'));
    }
    return this.http.get<boolean>(`${this.personaApiUrl}/${id}`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // Crear permiso con archivo PDF (formulario multiparte)
  crearPermiso(formData: FormData): Observable<any> {
    if (!formData) {
      return throwError(() => new Error('Datos del permiso incompletos.'));
    }

    // Enviar los datos con FormData (ya contiene archivo PDF si está presente)
    return this.http.post<any>(this.apiUrl, formData).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // ✅ Nuevo método: Actualizar estado del permiso
  actualizarEstadoPermiso(id: number, estado: string): Observable<any> {
    if (!id || !estado) {
      return throwError(() => new Error('ID o estado inválido.'));
    }

    return this.http.put(`${this.apiUrl}/${id}/estado`, { estado }).pipe(
      catchError(error => this.handleError(error))
    );
  }

// ✅ Descargar documento PDF
descargarArchivo(nombreArchivo: string): Observable<Blob> {
  const url = `${this.apiUrl}/descargar/${nombreArchivo}`;
  return this.http.get(url, { responseType: 'blob' }).pipe(
    catchError(error => this.handleError(error))
  );
}




  // Manejo de errores
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Algo salió mal; por favor intente nuevamente más tarde.';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400:
          errorMessage = 'Solicitud incorrecta.';
          break;
        case 404:
          errorMessage = 'Recurso no encontrado.';
          break;
        case 409:
          errorMessage = 'Conflicto en la solicitud.';
          break;
        case 500:
          errorMessage = 'Error interno del servidor.';
          break;
        default:
          errorMessage = error.error?.message || errorMessage;
          break;
      }
    }

    console.error('Error en la solicitud:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
