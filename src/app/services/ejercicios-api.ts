import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// 1. Definimos las Interfaces para tener autocompletado y evitar errores
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface Muscle {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class EjerciciosAPI {
  // 2. Configuración de la API (Sustituye TU_API_KEY con la de tu captura)
  private baseUrl = 'https://edb-with-videos-and-images-by-ascendapi.p.rapidapi.com/api/v1';
  private apiKey = '81996b6bc6mshe7d0dc3c63cefdep145976jsn9336c1ffd294';
  private apiHost = 'edb-with-videos-and-images-by-ascendapi.p.rapidapi.com';

  constructor(private http: HttpClient) {}

  // 3. Creamos los Headers reutilizables
  private get headers() {
    return new HttpHeaders({
      'x-rapidapi-key': this.apiKey,
      'x-rapidapi-host': this.apiHost
    });
  }

  // 4. Método para obtener todos los músculos (el que probaste en RapidAPI)
  getMuscles(): Observable<ApiResponse<Muscle[]>> {
    return this.http.get<ApiResponse<Muscle[]>>(`${this.baseUrl}/muscles`, {
      headers: this.headers
    });
  }

  // 5. Método para obtener todos los ejercicios (donde vienen los videos/fotos)
  getExercises(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.baseUrl}/exercises`, {
      headers: this.headers
    });
  }

  // 6. Método para obtener detalle de un ejercicio por su ID
  getExerciseById(id: string): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.baseUrl}/exercises/${id}`, {
      headers: this.headers
    });
  }
}