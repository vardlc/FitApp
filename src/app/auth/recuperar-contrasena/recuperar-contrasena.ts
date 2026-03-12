import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recuperar-contrasena',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './recuperar-contrasena.html',
  styleUrls: ['./recuperar-contrasena.css'],
})
export class RecuperarContrasena {
  correo = '';
  password = '';
  confirmPassword = '';

  constructor(private clienteService: ClienteService) {}

  cambiarPassword() {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const datos = {
      Correo: this.correo,
      NuevaPassword: this.password,
    };

    this.clienteService.recuperarPassword(datos).subscribe({
      next: (res) => {
        console.log('Contraseña cambiada', res);
        alert('Contraseña actualizada');
      },

      error: (err) => {
        console.log('Error', err);
      },
    });
  }
}
