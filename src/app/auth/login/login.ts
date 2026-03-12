import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  email: string = '';
  password: string = '';

  constructor(private clienteService: ClienteService) {}

  login(){

    const datos = {
      email: this.email,
      password: this.password
    };

    this.clienteService.login(datos).subscribe({
      next:(res)=>{
        console.log("Login correcto", res);
      },
      error:(err)=>{
        console.log("Credenciales incorrectas", err);
      }
    });

  }

}