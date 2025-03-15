import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/environments';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/users';
  }

  signIn(user: User): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);
  }

  login(user: User): Observable<string> {
    const url = `${this.myAppUrl}${this.myApiUrl}/login`; // Almacena la URL en una variable

    console.log('URL de login:', url); // Agrega este console.log para depurar

    return this.http.post<string>(url, user);
  }
}