import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ListPersonasComponent } from './components/list-personas/list-personas.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ListPermisosComponent } from './components/list-permisos/list-permisos.component';
import { RegistroHorasComponent } from './components/registro-horas/registro-horas.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'sign-in', component: SignInComponent },
    {
        path: 'list-personas',
        component: LayoutComponent,
        children: [
            { path: '', component: ListPersonasComponent },
            { path: 'permisos', component: ListPermisosComponent },  // Reemplazamos PermisoComponent por ListPermisosComponent
            { path: 'registro-horas', component: RegistroHorasComponent }
        ],
    },
    { path: '**', redirectTo: 'login', pathMatch: 'full'}
];

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideAnimations(),
        importProvidersFrom(ToastrModule.forRoot())
    ]
};
