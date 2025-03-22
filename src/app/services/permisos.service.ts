import { environment } from '../../enviroments/environments'
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Permiso } from '../interfaces/permiso';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {
  private apiUrl: string = `${environment.apiUrl}/api/permisos/`; // ✅ Corrección en la URL

  constructor(private http: HttpClient) {}

  // Obtener permisos desde la API
  getPermisos(): Observable<Permiso[]> {
    return this.http.get<Permiso[]>(this.apiUrl);
  }

  // Solicitar un nuevo permiso
  solicitarPermiso(permiso: Permiso): Observable<void> {
    return this.http.post<void>(this.apiUrl, permiso);
  }

  // Actualizar el estado de un permiso
  actualizarEstado(id: number, estado: 'pendiente' | 'aprobado' | 'denegado'): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, { estado }); // ✅ Se agregó `/` antes del id
  }
}
