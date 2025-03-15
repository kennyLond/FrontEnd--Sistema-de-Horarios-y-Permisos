// Importamos los módulos necesarios para manejar errores HTTP y notificaciones
import { HttpErrorResponse } from '@angular/common/http'; // Manejo de errores en peticiones HTTP
import { Injectable } from '@angular/core'; // Decorador para inyectar servicios en Angular
import { ToastrService } from 'ngx-toastr'; // Servicio para mostrar notificaciones emergentes

// Decorador que indica que este servicio se puede inyectar en cualquier parte de la aplicación
@Injectable({
  providedIn: 'root' // Hace que este servicio esté disponible en toda la aplicación sin necesidad de importarlo en módulos específicos
})
export class ErrorService {

  // Constructor donde se inyecta el servicio de Toastr para mostrar mensajes de error
  constructor(private toastr: ToastrService) { }

  // Método para mostrar un mensaje de error basado en la respuesta del servidor
  msjError(e: HttpErrorResponse) {
    // Si el error contiene un mensaje específico, lo mostramos
    if (e.error.msg) {
      this.toastr.error(e.error.msg, 'Error');
    } else {
      // Si no hay un mensaje específico, mostramos un mensaje genérico
      this.toastr.error('Upps ocurrió un error, comuníquese con el administrador', 'Error');
    }
  }
}
