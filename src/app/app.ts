import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClienteService } from './services/cliente';
import { Login } from './login/login';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,Login,CommonModule],
  templateUrl:'./app.html',
  styleUrl:'./app.css',
})
export class App implements OnInit {

  clientes: any[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    this.clienteService.getClientes().subscribe(data => {
      console.log(data);
      this.clientes = data;
    });
  }
}