import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EjerciciosAPI } from '../../services/ejercicios-api';

@Component({
  selector: 'app-ejercicios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './ejercicios.html',
  styleUrl: './ejercicios.css'
})
export class Ejercicios implements OnInit {

  tipo: string = '';
  ejercicios: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private ejerciciosService: EjerciciosAPI
  ) {}

  ngOnInit() {
    this.tipo = this.route.snapshot.paramMap.get('tipo') || '';
    this.cargarEjercicios();
  }

  cargarEjercicios() {
    console.log('1. Solicitando lista general...');

    this.ejerciciosService.getExercises().subscribe({
      next: (res) => {
        if (res.success && res.data.length > 0) {
          
          this.ejercicios = res.data.map((e: any) => ({
            ...e,
            nombre: e.name,              
            imagen: e.imageUrl,          
            selected: false,
            calorias: 100,               
            tiempo: 10,                  
            series: 4,                   
            reps: 12,                    
            targetMuscles: e.targetMuscles || []
          }));
          
          this.cargarDetalleEjercicio(this.ejercicios[0]);

        } else {
          console.warn('La API no devolvió ejercicios.');
        }
      },
      error: (err) => console.error('Error en la petición general:', err)
    });
  }

  // Función para traer Video e Instrucciones de un ejercicio específico
  cargarDetalleEjercicio(ejercicio: any) {
    if (!ejercicio.exerciseId || ejercicio.videoUrl) return; 

    this.ejerciciosService.getExerciseById(ejercicio.exerciseId).subscribe({
      next: (detalleRes) => {
        if (detalleRes.success) {
          const ex = detalleRes.data;
          ejercicio.videoUrl = ex.videoUrl;
          ejercicio.instructions = ex.instructions;
          ejercicio.targetMuscles = ex.targetMuscles;
          console.log(`✅ Contenido extra cargado para: ${ejercicio.nombre}`);
        }
      },
      error: (err) => console.error('Error cargando detalle:', err)
    });
  }

  // Getters para la sidebar y totales
  get ejerciciosSeleccionados() {
    return this.ejercicios.filter(e => e.selected);
  }

  get totalCaloriasSeleccionadas() {
    return this.ejerciciosSeleccionados.reduce((total, e) => total + (e.calorias || 0), 0);
  }

  get totalTiempo() {
    return this.ejercicios.reduce((total, e) => total + (e.tiempo || 0), 0);
  }

  get totalCalorias() {
    return this.ejercicios.reduce((total, e) => total + (e.calorias || 0), 0);
  }

  // INTERACCIÓN: Al hacer clic en la tarjeta
  toggleSeleccion(ejercicio: any) {
    ejercicio.selected = !ejercicio.selected;

    if (ejercicio.selected) {
      this.cargarDetalleEjercicio(ejercicio);
    }
  }

  seleccionarTodos() {
    this.ejercicios.forEach(e => {
      e.selected = true;
      this.cargarDetalleEjercicio(e);
    });
  }

  limpiarSeleccion() {
    this.ejercicios.forEach(e => e.selected = false);
  }
}



// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { EjerciciosAPI } from '../../services/ejercicios-api';

// @Component({
//   selector: 'app-ejercicios',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterModule],
//   templateUrl: './ejercicios.html',
//   styleUrl: './ejercicios.css'
// })
// export class Ejercicios implements OnInit {

//   tipo: string = '';
//   ejercicios: any[] = [];

//   constructor(
//     private route: ActivatedRoute,
//     private ejerciciosService: EjerciciosAPI
//   ) {}

//   ngOnInit() {
//     this.tipo = this.route.snapshot.paramMap.get('tipo') || '';
//     this.cargarEjercicios();
//   }

//   cargarEjercicios() {
//     console.log('1. Solicitando lista general de ejercicios...');

//     this.ejerciciosService.getExercises().subscribe({
//       next: (res) => {
//         if (res.success && res.data.length > 0) {
          
//           // MAPEO: Convertimos los datos de la API a tus nombres de variable
//           this.ejercicios = res.data.map((e: any) => ({
//             ...e,
//             nombre: e.name,              // La API usa 'name'
//             imagen: e.imageUrl,          // La API usa 'imageUrl'
//             selected: false,
//             calorias: 100,               // Valor temporal
//             tiempo: 10,                  // Valor temporal
//             targetMuscles: e.targetMuscles || [] // Aseguramos que sea array
//           }));
          
//           const primerId = this.ejercicios[0].exerciseId;
//           console.log(`2. Solicitando detalle para: ${this.ejercicios[0].nombre}`);

//           this.ejerciciosService.getExerciseById(primerId).subscribe({
//             next: (detalleRes) => {
//               if (detalleRes.success) {
//                 const ex = detalleRes.data;
                
//                 // Actualizamos el primer ejercicio con los datos "pesados"
//                 this.ejercicios[0].videoUrl = ex.videoUrl;
//                 this.ejercicios[0].instructions = ex.instructions; // Pasos a paso
//                 this.ejercicios[0].targetMuscles = ex.targetMuscles;
                
//                 console.log('✅ Detalle del primer ejercicio cargado con éxito');
//               }
//             },
//             error: (err) => console.error('Error en detalle:', err)
//           });

//         } else {
//           console.warn('La API no devolvió ejercicios.');
//         }
//       },
//       error: (err) => console.error('Error en la petición general:', err)
//     });
//   }

//   // Getters para cálculos
//   get ejerciciosSeleccionados() {
//     return this.ejercicios.filter(e => e.selected);
//   }

//   get totalCaloriasSeleccionadas() {
//     return this.ejerciciosSeleccionados.reduce((total, e) => total + (e.calorias || 0), 0);
//   }

//   get totalTiempo() {
//     return this.ejercicios.reduce((total, e) => total + (e.tiempo || 0), 0);
//   }

//   get totalCalorias() {
//     return this.ejercicios.reduce((total, e) => total + (e.calorias || 0), 0);
//   }

//   // Funciones de interacción
//   toggleSeleccion(ejercicio: any) {
//     ejercicio.selected = !ejercicio.selected;
//   }

//   seleccionarTodos() {
//     this.ejercicios.forEach(e => e.selected = true);
//   }

//   limpiarSeleccion() {
//     this.ejercicios.forEach(e => e.selected = false);
//   }
// }




// import { Component, OnInit } from '@angular/core'; // Añadimos OnInit
// import { ActivatedRoute } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { EjerciciosAPI } from '../../services/ejercicios-api'

// @Component({
//   selector: 'app-ejercicios',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterModule],
//   templateUrl: './ejercicios.html',
//   styleUrl: './ejercicios.css'
// })
// export class Ejercicios implements OnInit {

//   tipo: string = '';
//   ejercicios: any[] = [];

//   // 1. Inyectamos el servicio en el constructor
//   constructor(
//     private route: ActivatedRoute,
//     private ejerciciosService: EjerciciosAPI
//   ) {}

//   ngOnInit() {
//     this.tipo = this.route.snapshot.paramMap.get('tipo') || '';
//     this.cargarEjercicios();
//   }

//   cargarEjercicios() {
//   console.log('1. Solicitando lista general de ejercicios...');

//   this.ejerciciosService.getExercises().subscribe({
//     next: (res) => {
//       if (res.success && res.data.length > 0) {
//         // Guardamos la lista para que tu HTML siga funcionando
//         this.ejercicios = res.data;
        
//         // Tomamos el ID del primer ejercicio para la prueba de fuego
//         const primerId = res.data[0].exerciseId;
//         console.log(`2. ID encontrado en la lista: ${primerId}. Solicitando detalle...`);

//         // LLAMADA AL DETALLE (Asegúrate de haber cambiado a /exercise/ en tu servicio)
//         this.ejerciciosService.getExerciseById(primerId).subscribe({
//           next: (detalleRes) => {
//             console.log('--- ¡COFRE DEL TESORO ABIERTO! ---');
//             if (detalleRes.success) {
//               const ex = detalleRes.data;
//               console.log('Objeto Detallado:', ex);
              
//               // Verificación de los campos "premium"
//               console.log('Nombre en detalle:', ex.name);
//               console.log('🎥 Video URL:', ex.videoUrl || '❌ Sigue sin venir video');
//               console.log('🖼️ URL de Imagen:', ex.imageUrl);
//               console.log('📝 Instrucciones:', ex.instructions || '❌ No hay instrucciones');
//               console.log('💪 Músculo Target:', ex.targetMuscles ? ex.targetMuscles[0] : 'N/A');
              
//               // Tip: Si quieres que el primer ejercicio de tu lista tenga el video ya:
//               this.ejercicios[0].videoUrl = ex.videoUrl;
//               this.ejercicios[0].instructions = ex.instructions;
//               this.ejercicios[0].imagen = ex.imageUrl;
//             }
//           },
//           error: (err) => {
//             console.error('Error al traer el detalle (Revisa si el endpoint es /exercise/ en el servicio):', err);
//           }
//         });

//       } else {
//         console.warn('La API no devolvió ejercicios.');
//       }
//     },
//     error: (err) => {
//       console.error('Error en la petición general:', err);
//     }
//   });
// }

//   // Los getters y funciones se mantienen igual, 
//   // pero ojo: si la API no trae 'calorias' o 'tiempo', darán 0 o NaN.
//   get ejerciciosSeleccionados() {
//     return this.ejercicios.filter(e => e.selected);
//   }

//   get totalCaloriasSeleccionadas() {
//     return this.ejerciciosSeleccionados
//       .reduce((total, e) => total + (e.calorias || 0), 0);
//   }

//   get totalTiempo() {
//     return this.ejercicios.reduce((total, e) => total + (e.tiempo || 0), 0);
//   }

//   get totalCalorias() {
//     return this.ejercicios.reduce((total, e) => total + (e.calorias || 0), 0);
//   }

//   toggleSeleccion(ejercicio: any) {
//     ejercicio.selected = !ejercicio.selected;
//   }

//   seleccionarTodos() {
//     this.ejercicios.forEach(e => e.selected = true);
//   }

//   limpiarSeleccion() {
//     this.ejercicios.forEach(e => e.selected = false);
//   }
// }


// import { Component } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { EjerciciosAPI } from '../../services/ejercicios-api'

// @Component({
//   selector: 'app-ejercicios',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterModule],
//   templateUrl: './ejercicios.html',
//   styleUrl: './ejercicios.css'
// })
// export class Ejercicios {

//   tipo: string = '';

//   ejercicios: any[] = [];

//   constructor(private route: ActivatedRoute) {}

//   ngOnInit() {
//     this.tipo = this.route.snapshot.paramMap.get('tipo') || '';
//     this.cargarEjercicios();
//   }

//   // datos temporales
//   cargarEjercicios() {
//     this.ejercicios = [
//       {
//         nombre: 'Press de banca',
//         descripcion: 'Ejercicio para pecho',
//         tiempo: 10,
//         calorias: 80,
//         series: 4,
//         reps: 10,
//         nivel: 'Facil',
//         selected: false
//       },
//       {
//         nombre: 'Sentadillas',
//         descripcion: 'Piernas y glúteos',
//         tiempo: 15,
//         calorias: 120,
//         series: 4,
//         reps: 12,
//         nivel: 'Moderado',
//         selected: false
//       },
//       {
//         nombre: 'Burpees',
//         descripcion: 'Cardio intenso',
//         tiempo: 8,
//         calorias: 100,
//         series: 3,
//         reps: 15,
//         nivel: 'Dificil',
//         selected: false
//       }
//     ];
//   }

//   get ejerciciosSeleccionados() {
//     return this.ejercicios.filter(e => e.selected);
//   }

//   get totalCaloriasSeleccionadas() {
//     return this.ejerciciosSeleccionados
//       .reduce((total, e) => total + e.calorias, 0);
//   }

//   get totalTiempo() {
//     return this.ejercicios.reduce((total, e) => total + e.tiempo, 0);
//   }

//   get totalCalorias() {
//     return this.ejercicios.reduce((total, e) => total + e.calorias, 0);
//   }

//   //funciones
//   toggleSeleccion(ejercicio: any) {
//     ejercicio.selected = !ejercicio.selected;
//   }

//   seleccionarTodos() {
//     this.ejercicios.forEach(e => e.selected = true);
//   }

//   limpiarSeleccion() {
//     this.ejercicios.forEach(e => e.selected = false);
//   }

// }