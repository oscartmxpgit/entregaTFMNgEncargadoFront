import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NegocioService } from './negocio.service';

@Injectable({
  providedIn: 'root'
})
export class PlatoService {
  baseURL = `${environment.apiUrl}api/Platos`;

  constructor( private http : HttpClient, private negocioService:NegocioService) { }

  postPlato(data : any){
    return this.http.post<any>(`${this.baseURL}`,data);
  }

  getPlatos(){
    var negocioId= this.negocioService.getStoredNegocioId()
    return this.http.get<any>(`${this.baseURL}/negocio/${negocioId}`);
  }

  putPlato(data:any, id : number){
    return this.http.put<any>(`${this.baseURL}/${id}`,data);
  }

  deletePlato(id:number){
    return this.http.delete<any>(`${this.baseURL}/${id}`);

  }
}
