// Importamos los módulos necesarios de Angular
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner', // Nombre del componente para ser usado en otras plantillas
  templateUrl: './spinner.component.html', // Enlace a la plantilla HTML del componente
  styleUrls: ['./spinner.component.css'] // Enlace a los estilos CSS del componente
})
export class SpinnerComponent implements OnInit { // Implementa la interfaz OnInit

  constructor() { } // Constructor vacío, no se necesita inyectar dependencias en este caso

  ngOnInit(): void {
    // Este método se ejecuta al inicializar el componente
    // No es necesario agregar lógica aquí ya que el spinner solo se muestra/oculta según la lógica del padre
  }

}
