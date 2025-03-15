import { Routes } from '@angular/router';
import { ListPersonasComponent } from './components/list-personas/list-personas.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'list-personas', component: ListPersonasComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];