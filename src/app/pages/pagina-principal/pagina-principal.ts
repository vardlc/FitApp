import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-pagina-principal',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './pagina-principal.html',
  styleUrls: ['./pagina-principal.css']
})
export class PaginaPrincipal implements OnInit {
  mostrarDetalles = true;

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Aquí puedes inicializar otras cosas que requieran 'window' o 'document'
      console.log('Componente cargado en el navegador');
    }
  }

  toggleDetalles(): void {
    this.mostrarDetalles = !this.mostrarDetalles;
    // Forzamos la detección de cambios si es necesario tras el toggle
    this.cdr.detectChanges();
  }
}