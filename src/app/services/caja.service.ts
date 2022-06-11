import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NegocioService } from './negocio.service';

@Injectable({
  providedIn: 'root'
})
export class CajaService {
  baseURL = `${environment.apiUrl}api/OperacionesCajas`;

  constructor( private http : HttpClient, private negocioService:NegocioService) { }

  postCaja(data : any){
    return this.http.post<any>(`${this.baseURL}`,data);
  }

  getOpCajas(){
    var negocioId= this.negocioService.getStoredNegocioId()
    return this.http.get<any>(`${this.baseURL}/negocio/${negocioId}`);
  }

  getOpCajasValidadas(){
    var negocioId= this.negocioService.getStoredNegocioId()
    return this.http.get<any>(`${this.baseURL}/validadas/negocio/${negocioId}`);
  }

  getIncrementosCaja(){
    var negocioId= this.negocioService.getStoredNegocioId()
    return this.http.get<any>(`${this.baseURL}/incremento/negocio/${negocioId}`);
  }

  getTotalcaja(){
    var negocioId= this.negocioService.getStoredNegocioId()
    return this.http.get<any>(`${this.baseURL}/totalcaja/negocio/${negocioId}`);
  }

  putCaja(data:any, id : number){
    return this.http.put<any>(`${this.baseURL}/${id}`,data);
  }

  deleteCaja(id:number){
    return this.http.delete<any>(`${this.baseURL}/${id}`);

  }
}
