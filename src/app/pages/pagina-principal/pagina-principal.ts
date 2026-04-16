import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SmartwatchService } from '../../services/smartwatch';
import { SmartwatchData } from '../../models/smartwatch.model';

@Component({
  selector: 'app-pagina-principal',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './pagina-principal.html',
  styleUrls: ['./pagina-principal.css']
})
export class PaginaPrincipal implements OnInit {
  mostrarDetalles = true;
  isLoggedIn = false;
  datosWatch: SmartwatchData | null = null;

  private CLIENT_ID = '1029714173109-sdl2lgjcreilg6kjookodqp83m22tn87.apps.googleusercontent.com';

  constructor(
    private watchService: SmartwatchService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.verificarRetornoDeGoogle();
    }
  }

  private verificarRetornoDeGoogle(): void {
    const currentUrl = window.location.href;
    const hashIndex = currentUrl.indexOf('#');
    
    if (hashIndex !== -1) {
      const fragment = currentUrl.substring(hashIndex + 1);
      const params = new URLSearchParams(fragment);
      const token = params.get('access_token');

      if (token) {
        console.log('¡Token detectado con éxito!');
        this.isLoggedIn = true;
        sessionStorage.setItem('google_token', token);
        this.cargarDatosReales(token);
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    } else {
      const savedToken = sessionStorage.getItem('google_token');
      if (savedToken) {
        this.isLoggedIn = true;
        this.cargarDatosReales(savedToken);
      } else {
        this.cargarDatosBackup();
      }
    }
  }

  loginConGoogle(): void {
    if (isPlatformBrowser(this.platformId)) {
      const redirectUri = 'http://localhost:4200/pagina-principal'; 
      
      const params = new URLSearchParams();
      params.set('client_id', this.CLIENT_ID);
      params.set('redirect_uri', redirectUri);
      params.set('response_type', 'token');
      params.set('scope', 'https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.heart_rate.read');
      params.set('prompt', 'consent select_account');

      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    }
  }

  cargarDatosReales(token: string): void {
    this.watchService.getDatosGoogleFit(token).subscribe({
      next: (data) => {
        console.log('Datos de Google Fit recibidos:', data);
        let pasosExtraidos = 0;
        try {
          const puntos = data.bucket[0].dataset[0].point;
          if (puntos.length > 0) {
            pasosExtraidos = puntos[0].value[0].intVal;
          }
        } catch (e) {
          console.log('No se encontraron puntos de pasos, se usará 0.');
        }
        this.datosWatch = {
          frecuenciaCardiaca: 75,
          pasosHoy: pasosExtraidos,
          caloriasQuemadas: Math.round(pasosExtraidos * 0.04),
          minutosActivos: 60,
          oxigenoSangre: 99,
          suenoAnoche: 8
        };
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('--- ERROR DETALLADO ---');
        console.log(err.error); 
        this.cargarDatosBackup();
      }
    });
  }

  cargarDatosBackup(): void {
    this.watchService.getDatos().subscribe({
      next: (data) => {
        this.datosWatch = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error en backup:', err)
    });
  }

  logout(): void {
    sessionStorage.removeItem('google_token');
    this.isLoggedIn = false;
    this.datosWatch = null;
  }

  toggleDetalles(): void {
    this.mostrarDetalles = !this.mostrarDetalles;
  }
}