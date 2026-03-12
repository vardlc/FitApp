import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagina-principal',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './pagina-principal.html',
  styleUrls: ['./pagina-principal.css']
})
export class PaginaPrincipal {

  mostrarDetalles = false;

  toggleDetalles(){
    this.mostrarDetalles = !this.mostrarDetalles;
  }

}
