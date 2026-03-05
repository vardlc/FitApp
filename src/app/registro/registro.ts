import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {

  nombre = "";
  correo = "";
  password = "";
  confirmarPassword = "";

  formCompleto(): boolean {
    return (
      this.nombre.trim() !== "" &&
      this.correo.trim() !== "" &&
      this.password.trim() !== "" &&
      this.confirmarPassword.trim() !== ""
    );
  }

}