import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from './services/cliente';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
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