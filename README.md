## AUTOR
Kenny Orlando Londoño Torrado – Desarrollador Frontend Jr. 
([@kennyLond])
(https://github.com/kennyLond/FrontEnd--Sistema-de-Horarios-y-Permisos))

# Sistema de Horarios y Permisos TEMPO
Aplicación web desarrollada con Angular y TypeScript para la gestión de personas, permisos y registros de horas. Permite visualizar, crear, editar y eliminar registros a través de una API REST personalizada y una interfaz intuitiva.

Este proyecto fue realizado como parte del requisito final para culminar mi etapa productiva en el SENA como Desarrollador Frontend Angular Jr.

# OBJETIVO
Desarrollar una aplicación de Página Única (SPA) que permita realizar operaciones CRUD sobre personas, permisos y registros de asistencia, aplicando buenas prácticas de desarrollo frontend con Angular, uso de TypeScript, componentes reutilizables, validaciones reactivas y consumo de una API propia.

# FUNCIONALIDADES PRINCIPALES
Listado de personas con opción de búsqueda, edición y eliminación

Registro y gestión de permisos

Registro de horas trabajadas

Solicitud de permisos por parte del usuario

Formularios con validaciones reactivas y mensajes en tiempo real

Confirmación de acciones sensibles (como eliminación)

Notificaciones de éxito y error mediante alertas visuales

Autenticación de usuario (login y registro)

Interfaz responsiva e intuitiva adaptable a diferentes dispositivos

## REQUISITOS DEL SISTEMA
Node.js ≥ 18

NPM ≥ 9

MySQL 8.x

Navegador web moderno (Chrome, Firefox, Edge, etc.)

Angular CLI instalado globalmente (opcional, pero recomendado)

## Comandos de uso

### Clonar el repositorio

git clone https://github.com/kennyLond/FrontEnd--Sistema-de-Horarios-y-Permisos
cd FrontEnd--Sistema-de-Horarios-y-Permisos

## INSTALAR DEPENDENCIAS FRONTEND
npm install

## LEVANTAR PROYECTO EN MODO DESARROLLO
npm start

# DEPENDENCIAS DEL PROYECTO

## DEPENDENCIAS DE DESARROLLO
@angular-devkit/build-angular

@angular/cli

@angular/compiler-cli

typescript

@types/jasmine

jasmine-core

## DEPENDENCIAS DE PRODUCCIÓN 
@angular/animations

@angular/cdk

@angular/common

@angular/core

@angular/forms

@angular/router

@angular/material

bootstrap

ngx-toastr

rxjs

zone.js

tslib


## Tecnologías Utilizadas

Este proyecto fue desarrollado utilizando el siguiente stack de tecnologías:

### Framework y Lenguaje
- **Angular 19** – Framework para el desarrollo de aplicaciones web SPA.
- **TypeScript** – Superset de JavaScript con tipado estático.

### UI y Estilos
- **Angular Material** – Componentes UI basados en Material Design.
- **Bootstrap 5** – Framework CSS para diseño responsive.

### Notificaciones
- **Ngx-Toastr** – Para mostrar mensajes emergentes (toasts) al usuario.

### Programación Reactiva
- **RxJS** – Biblioteca para trabajar con programación reactiva y observables.

### Herramientas de Desarrollo
- **Angular CLI** – Interfaz de línea de comandos para generación y gestión del proyecto.

##  Estructura del Proyecto
El proyecto está organizado por funcionalidades, permitiendo una mejor escalabilidad y mantenimiento del código.

##  Metodología de Desarrollo
La organización del proyecto se basa en los siguientes principios:

Separación de funcionalidades: cada módulo/componentes relacionados con una función específica están agrupados.

Responsabilidad única: cada carpeta maneja una sola responsabilidad (vistas, servicios, interfaces, utilidades, etc.).

Reutilización: componentes reutilizables están centralizados en shared/.

Esto facilita:

Escalabilidad del proyecto

Mantenimiento del código

Lectura clara para otros desarrolladores

