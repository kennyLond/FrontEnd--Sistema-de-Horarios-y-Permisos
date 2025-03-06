import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../interfaces/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private myAppUrl: string;
  private myApiUrl: string;


  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/personas/'
  }

  getPersonas(): Observable<Persona[]>{
    return this.http.get<Persona[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  deletePersona(id: number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)


  }
}
