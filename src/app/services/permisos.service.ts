import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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

  // Crear un nuevo permiso
  crearPermiso(permiso: any): Observable<any> {
    console.log('Permiso recibido en crearPermiso:', permiso); // 🔍 Debug

    if (!permiso || !permiso.id || !permiso.tipo_permiso || !permiso.fecha_solicitud) {
      return throwError(() => new Error('Datos del permiso incompletos.'));
    }

    // Convertir la fecha al formato correcto "YYYY-MM-DD HH:MM:SS"
    try {
      const fecha = new Date(permiso.fecha_solicitud);
      if (isNaN(fecha.getTime())) {
        return throwError(() => new Error('Fecha de solicitud inválida.'));
      }
      const fechaFormateada = fecha.toISOString().slice(0, 19).replace("T", " ");
      permiso.fecha_solicitud = fechaFormateada;
    } catch (error) {
      return throwError(() => new Error('Error al procesar la fecha de solicitud.'));
    }

    console.log('Datos que se envían al backend:', permiso);  // 🔍 Debug

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, permiso, { headers }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // Manejo de errores centralizado
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Algo salió mal; por favor intente nuevamente más tarde.';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400:
          errorMessage = 'Solicitud incorrecta. Verifique los datos enviados.';
          break;
        case 404:
          errorMessage = 'Recurso no encontrado.';
          break;
        case 409:
          errorMessage = 'Conflicto en la solicitud. Verifique los datos.';
          break;
        case 500:
          errorMessage = 'Error interno del servidor. Intente más tarde.';
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
