import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ListPersonasComponent } from './components/list-personas/list-personas.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { SignInComponent } from './components/sign-in/sign-in.component'; // Importa SignInComponent

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'sign-in', component: SignInComponent }, // Añade esta línea
    {
        path: 'list-personas',
        component: LayoutComponent,
        children: [
            { path: '', component: ListPersonasComponent },
        ],
    },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideAnimations(),
        importProvidersFrom(ToastrModule.forRoot())
    ]
};