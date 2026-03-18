import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Registro } from './auth/registro/registro';
import { PaginaPrincipal } from './pagina-principal/pagina-principal';
import { RecuperarContrasena } from './auth/recuperar-contrasena/recuperar-contrasena';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'registro', component: Registro},
  { path: 'recuperar-contrasena', component: RecuperarContrasena},
  { path: 'pagina_principal', component: PaginaPrincipal},
  { path: 'pagina_principal', component: PaginaPrincipal},
  { path: 'recuperarContrasena', component: RecuperarContrasena }
];
