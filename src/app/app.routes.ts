import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Registro } from './registro/registro';
import { PaginaPrincipal } from './pagina-principal/pagina-principal';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'registro', component: Registro},
  { path: 'pagina_principal', component: PaginaPrincipal}
];
