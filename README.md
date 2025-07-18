<<<<<<< HEAD
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

## EVIDENCIA (Imagenes)
###  Evidencia 1 – Vista Inicio de Sesión
![Evidencia 1](https://drive.google.com/file/d/19tjMDtWuRNkPBfO-ru-b9e_UI1jpmMZb/view?usp=sharing)

###  Evidencia 2 – Vista Registrar Usuario
![Evidencia 2](https://drive.google.com/file/d/10l8U5m_hyUPVIj8lSCQrUg4xiLglSJ7F/view?usp=sharing)

###  Evidencia 3 – Confirmación de Usuario creado
![Evidencia 3](https://drive.google.com/file/d/10l8U5m_hyUPVIj8lSCQrUg4xiLglSJ7F/view?usp=sharing)

###  Evidencia 4 – Edición de libro (Editar Orgullo y Odio por Orgullo y prejuicio )
![Evidencia 4](https://drive.google.com/uc?id=1NGt2ZxH5pM0tD3up8gZ_g-aFg85EFI5k)

###  Evidencia 5 – Calendario de publicación
![Evidencia 5](https://drive.google.com/uc?id=1NKUKMotr_QAqRLnACMd1mgRplZ33dGCz)

### Evidencia 6 – Confirmación de eliminación
![Evidencia 6](https://drive.google.com/uc?id=10-nSJ4b9IY3ijJGvFcCVebgVp4_z2UJX)

### Evidencia 7 – Registro de nuevo libro
![Evidencia 7a](https://drive.google.com/uc?id=1tnu5zR7rZDJiVOpgPLJnVqLQkIB7cB91)
![Evidencia 7b](https://drive.google.com/uc?id=19E4EaZZiY_gzD7GOpGqyxfzfoGJkXgw8)

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

=======
# FronTEndCRUD

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
>>>>>>> d2fa9c1 (Initial commit)
