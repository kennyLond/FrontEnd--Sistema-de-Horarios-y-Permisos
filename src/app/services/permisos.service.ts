import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  private apiUrl = 'http://localhost:3000/api/permisos'; // URL del backend
  private personaApiUrl = 'http://localhost:3000/api/personas'; // Endpoint para verificar personas

  constructor(private http: HttpClient) { }

  obtenerPermisos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  verificarPersona(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.personaApiUrl}/${id}`)
      .pipe(
        catchError(() => throwError('La persona no existe.'))
      );
  }

  subirDocumento(permiso: any): Observable<any> {
    return this.verificarPersona(permiso.persona_id).pipe(
      switchMap(() => {
        const formData = new FormData();
        formData.append('persona_id', permiso.persona_id);
        formData.append('tipo_permiso', permiso.tipo_permiso);
        formData.append('fecha_solicitud', permiso.fecha_solicitud);

        if (permiso.documento) {
          formData.append('documento', permiso.documento, permiso.documento.name);
        }

        return this.http.post<any>(this.apiUrl, formData)
          .pipe(catchError(this.handleError));
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Algo salió mal; por favor intente nuevamente más tarde.';
    if (error.status === 404) {
      errorMessage = 'La persona no existe.';
    } else if (error.status === 409) {
      errorMessage = 'Ya existe un permiso de este tipo para esta persona.';
    }
    return throwError(errorMessage);
  }
}
