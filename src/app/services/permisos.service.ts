import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
