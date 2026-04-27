import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule], 
  templateUrl: './registro.html',
  styleUrls: ['./registro.css'],
})
export class Registro {
  rol = 'cliente';
  nombre = '';
  correo = '';
  password = '';
  confirmPassword = '';
  edad = 0;
  estatura = 0;
  peso = 0;
  especialidad = '';

  constructor(
    private clienteService: ClienteService,
    private router: Router,
  ) {}

  registrar() {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const datos: any = {
      nombre: this.nombre,
      correo: this.correo,
      password: this.password,
      rol: this.rol
    };

    if (this.rol === 'cliente') {
      datos.edad = this.edad;
      datos.estatura = this.estatura;
      datos.peso = this.peso;
    } else {
      datos.especialidad = this.especialidad;
    }

    this.clienteService.register(datos).subscribe({
      next: () => {
        alert(`Cuenta de ${this.rol} registrada correctamente`);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(err.error || 'Error al registrar usuario');
      },
    });
  }
}