import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private authURL = environment.apiURL + '/api/Auth';

  constructor(private http: HttpClient) {}

  login(data:any): Observable<any>{
    return this.http.post(`${this.authURL}/login`, data);
  }

  register(data:any): Observable<any>{
    return this.http.post(`${this.authURL}/register`, data);
  }
}