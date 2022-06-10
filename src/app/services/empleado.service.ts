import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NegocioService } from './negocio.service';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  baseURL = `${environment.apiUrl}api/empleados`;

  constructor( private http : HttpClient, private negocioService: NegocioService) { }

  getStoredEmpleadoId(){
    return localStorage.getItem('ecarta_idNegocio');
  }

  postEmpleado(data : any){
    return this.http.post<any>(`${this.baseURL}`,data);
  }

  getEmpleados(){
    var negocioId= this.negocioService.getStoredNegocioId()
    return this.http.get<any>(`${this.baseURL}/negocio/${negocioId}`);
  }

  putEmpleado(data:any, id : number){
    return this.http.put<any>(`${this.baseURL}/${id}`,data);
  }

  deleteEmpleado(id:number){
    return this.http.delete<any>(`${this.baseURL}/${id}`);

  }
}
