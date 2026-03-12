import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClienteService } from './services/cliente';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl:'./app.html',
  styleUrl:'./app.html',
})


export class App implements OnInit {
  clientes: any[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        console.log('Clientes:', data);
        this.clientes = data;
      },
      error: (err) => {
        console.error('Error conectando con API:', err);
      },
    });
  }
}
