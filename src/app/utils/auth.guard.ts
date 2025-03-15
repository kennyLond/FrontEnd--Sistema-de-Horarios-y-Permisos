// Importamos las dependencias necesarias
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Permite que Angular gestione esta clase como un servicio global
})
export class AuthGuard implements CanActivate { // Implementa la interfaz CanActivate

  // Inyectamos el Router para realizar redirecciones si el usuario no está autenticado
  constructor(private router: Router) {}

  // Método que verifica si el usuario tiene permiso para acceder a una ruta protegida
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Obtenemos el token almacenado en el localStorage
    const token = localStorage.getItem('token');

    // Si el token no existe o es undefined, redirigimos al usuario al login y bloqueamos el acceso
    if (token == undefined) {
      this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
      return false; // Bloquea el acceso a la ruta protegida
    }

    return true; // Permite el acceso si el usuario tiene un token válido
  }
}
