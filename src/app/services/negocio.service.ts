import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../modules/usuarios/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NegocioService {
  baseURL = `${environment.apiUrl}api/Negocios`;

  constructor( private http : HttpClient, private auth: AuthService) { }

  postNegocio(data : any){
    return this.http.post<any>(`${this.baseURL}`,data);
  }

  getNegocios(){
    return this.http.get<any>(`${this.baseURL}`);
  }

  getNegociosPorEncargadoId(){
    return this.http.get<any>(`${this.baseURL}/encargado/${this.auth.getIdEncargado()}`);
  }

  storeNegocioId(idNegocio){
    localStorage.setItem('ecarta_idNegocio', idNegocio);
  }

  getStoredNegocioId(){
    return localStorage.getItem('ecarta_idNegocio');
  }

  getNegocioPorId(){
    var negocioId= this.getStoredNegocioId();
    if (negocioId!=null)
     return this.http.get<any>(`${this.baseURL}/${negocioId}`);
    else return null;
  }

  putNegocio(data:any, id : number){
    return this.http.put<any>(`${this.baseURL}/${id}`,data);
  }

  deleteNegocio(id:number){
    return this.http.delete<any>(`${this.baseURL}/${id}`);

  }
}

