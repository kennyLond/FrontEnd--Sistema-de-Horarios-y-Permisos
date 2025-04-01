import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  // URL del backend donde se obtiene la lista de permisos
  private apiUrl = 'http://localhost:3000/api/permisos'; // Ajusta la URL según tu configuración

  constructor(private http: HttpClient) { }

  // Método para obtener la lista de permisos con información de la persona
  obtenerPermisos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Renombramos el método a 'subirDocumento'
  subirDocumento(permiso: any): Observable<any> {
    const formData = new FormData();
    
    // Agregar los datos al FormData
    formData.append('personaId', permiso.personaId);
    formData.append('nombre', permiso.nombre);
    formData.append('apellido', permiso.apellido);
    formData.append('estadoPermiso', permiso.estadoPermiso);
    formData.append('fechaSolicitud', permiso.fechaSolicitud);
    
    // Si hay un archivo de documento, agregarlo al FormData
    if (permiso.documento) {
      formData.append('documento', permiso.documento, permiso.documento.name); // Asumimos que 'documento' es un archivo
    }

    return this.http.post<any>(this.apiUrl, formData)
      .pipe(catchError(this.handleError)); // Manejo de errores
  }

  // Método para manejar errores en las peticiones HTTP
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Error del lado del cliente:', error.error.message);
    } else {
      console.error(
        `Código de estado del backend: ${error.status}, ` +
        `Cuerpo del error: ${error.error}`);
    }
    return throwError('Algo salió mal; por favor intente nuevamente más tarde.');
  }
}
