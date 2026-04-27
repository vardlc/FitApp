import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importante para el *ngIf

@Component({
  selector: 'app-registro',
  standalone: true,
  // Agregamos CommonModule para poder usar *ngIf en el HTML
  imports: [FormsModule, RouterModule, CommonModule], 
  templateUrl: './registro.html',
  styleUrls: ['./registro.css'],
})
export class Registro {
  // --- Propiedades del formulario ---
  rol = 'cliente'; // <--- ESTA ES LA QUE FALTABA
  nombre = '';
  correo = '';
  password = '';
  confirmPassword = '';
  
  // Campos de Salud (Solo para cliente)
  edad = 0;
  estatura = 0;
  peso = 0;

  // Campo para Coach (Ejemplo opcional)
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

    // Construimos el objeto dinámicamente
    const datos: any = {
      nombre: this.nombre,
      correo: this.correo,
      password: this.password,
      rol: this.rol
    };

    // Solo incluimos datos de salud si es cliente
    if (this.rol === 'cliente') {
      datos.edad = this.edad;
      datos.estatura = this.estatura;
      datos.peso = this.peso;
    } else {
      // Si es coach, podrías enviar campos específicos aquí
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