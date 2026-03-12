import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Registro } from './auth/registro/registro';
import { PaginaPrincipal } from './pages/pagina-principal/pagina-principal';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'registro', component: Registro},
  { path: 'pagina_principal', component: PaginaPrincipal}
];
