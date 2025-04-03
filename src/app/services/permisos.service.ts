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
      catchError(error => this.handleError(error)) // ✅ Manejo correcto del error
    );
  }

  // Verificar si una persona existe por su ID
  verificarPersona(id: number): Observable<boolean> {
    if (!id || id <= 0) {
      return throwError(() => new Error('ID de persona inválido.'));
    }

    return this.http.get<boolean>(`${this.personaApiUrl}/${id}`).pipe(
      catchError(error => this.handleError(error)) // ✅ Manejo correcto del error
    );
  }

  // Crear un nuevo permiso
  crearPermiso(permiso: any): Observable<any> {
    if (!permiso || !permiso.id || !permiso.tipo_permiso || !permiso.fecha_solicitud) {
      return throwError(() => new Error('Datos del permiso incompletos.'));
    }
  
    // Convertir la fecha al formato correcto "YYYY-MM-DD HH:MM:SS"
    const fecha = new Date(permiso.fecha_solicitud);
    const fechaFormateada = fecha.toISOString().slice(0, 19).replace("T", " ");
  
    // Clonar el objeto permiso y actualizar la fecha
    const permisoModificado = { ...permiso, fecha_solicitud: fechaFormateada };
  
    console.log('Datos que se envían al backend:', permisoModificado);  // 🔍 Debug
  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.http.post<any>(this.apiUrl, permisoModificado, { headers }).pipe(
      catchError(error => this.handleError(error))
    );
  }
  
  

  // Función para formatear la fecha correctamente
  private formatearFecha(fecha: any): string {
    if (!fecha) return '';

    const dateObj = new Date(fecha);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // ✅ +1 porque los meses empiezan desde 0
    const day = String(dateObj.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`; // ✅ Devuelve solo YYYY-MM-DD
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
    return throwError(() => new Error(errorMessage));
  }
}
