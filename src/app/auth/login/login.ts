import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
  ) {}

  login() {
    if (this.isLoading) return;

    this.isLoading = true;

    const datos = {
      correo: this.email,
      password: this.password,
    };

    this.clienteService.login(datos).pipe(take(1)).subscribe({
      next: (res) => {
        console.log('Login correcto', res);

        localStorage.setItem('usuario', JSON.stringify(res));

        this.router.navigate(['/pagina_principal']);
      },
      error: (err) => {
        console.log('Credenciales incorrectas', err);

        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
