
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from './services/cliente';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
  template: `
    <h1>Clientes</h1>
    <ul>
      <li *ngFor="let cliente of clientes">
        {{ cliente.nombre }}
      </li>
    </ul>
  `
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

