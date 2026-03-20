import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ejercicios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './ejercicios.html',
  styleUrl: './ejercicios.css'
})
export class Ejercicios {

  tipo: string = '';

  ejercicios: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.tipo = this.route.snapshot.paramMap.get('tipo') || '';
    this.cargarEjercicios();
  }

  // datos temporales
  cargarEjercicios() {
    this.ejercicios = [
      {
        nombre: 'Press de banca',
        descripcion: 'Ejercicio para pecho',
        tiempo: 10,
        calorias: 80,
        series: 4,
        reps: 10,
        nivel: 'Facil',
        selected: false
      },
      {
        nombre: 'Sentadillas',
        descripcion: 'Piernas y glúteos',
        tiempo: 15,
        calorias: 120,
        series: 4,
        reps: 12,
        nivel: 'Moderado',
        selected: false
      },
      {
        nombre: 'Burpees',
        descripcion: 'Cardio intenso',
        tiempo: 8,
        calorias: 100,
        series: 3,
        reps: 15,
        nivel: 'Dificil',
        selected: false
      }
    ];
  }

  get ejerciciosSeleccionados() {
    return this.ejercicios.filter(e => e.selected);
  }

  get totalCaloriasSeleccionadas() {
    return this.ejerciciosSeleccionados
      .reduce((total, e) => total + e.calorias, 0);
  }

  get totalTiempo() {
    return this.ejercicios.reduce((total, e) => total + e.tiempo, 0);
  }

  get totalCalorias() {
    return this.ejercicios.reduce((total, e) => total + e.calorias, 0);
  }

  //funciones
  toggleSeleccion(ejercicio: any) {
    ejercicio.selected = !ejercicio.selected;
  }

  seleccionarTodos() {
    this.ejercicios.forEach(e => e.selected = true);
  }

  limpiarSeleccion() {
    this.ejercicios.forEach(e => e.selected = false);
  }

}