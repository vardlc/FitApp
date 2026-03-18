import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css'],
})
export class Registro {
  nombre = '';
  edad = 0;
  correo = '';
  estatura = 0;
  peso = 0;
  password = '';
  confirmPassword = '';

  constructor(
    private clienteService: ClienteService,
    private router: Router,
  ) {}
  registrar() {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const datos = {
      nombre: this.nombre,
      edad: this.edad,
      correo: this.correo,
      estatura: this.estatura,
      peso: this.peso,
      password: this.password,
    };

    this.clienteService.register(datos).subscribe({
      next: () => {
        alert('Usuario registrado correctamente');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(err.error || 'Error al registrar usuario');
      },
    });
  }
}
