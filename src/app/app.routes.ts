import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Registro } from './auth/registro/registro';
import { PaginaPrincipal } from './pages/pagina-principal/pagina-principal';
import { RecuperarContrasena } from './auth/recuperar-contrasena/recuperar-contrasena';
<<<<<<< HEAD
=======

>>>>>>> ddaf0d6edaafd52ce323b465359fce0fbc7e0e32

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'registro', component: Registro},
<<<<<<< HEAD
  { path: 'recuperar-contrasena', component: RecuperarContrasena},
  { path: 'pagina_principal', component: PaginaPrincipal}
=======
  { path: 'pagina_principal', component: PaginaPrincipal},
  { path: 'recuperarContrasena', component: RecuperarContrasena }
>>>>>>> ddaf0d6edaafd52ce323b465359fce0fbc7e0e32
];
