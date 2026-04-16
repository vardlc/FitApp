import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SmartwatchData } from '../models/smartwatch.model';

@Injectable({
  providedIn: 'root'
})
export class SmartwatchService {
  constructor(private http: HttpClient) { }

  getDatos(): Observable<SmartwatchData> {
    return of({
      frecuenciaCardiaca: 0, pasosHoy: 0, caloriasQuemadas: 0,
      minutosActivos: 0, oxigenoSangre: 0, suenoAnoche: 0
    });
  }

  getDatosGoogleFit(token: string): Observable<any> {
    const url = 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const startTime = hoy.getTime();
    const endTime = Date.now();

    const body = {
      aggregateBy: [{
        dataTypeName: 'com.google.step_count.delta' 
      }],
      bucketByTime: { durationMillis: 86400000 },
      startTimeMillis: startTime,
      endTimeMillis: endTime
    };

    return this.http.post(url, body, { headers });
  }
}