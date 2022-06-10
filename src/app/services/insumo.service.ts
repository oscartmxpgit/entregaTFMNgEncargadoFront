import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NegocioService } from './negocio.service';

@Injectable({
  providedIn: 'root'
})
export class InsumoService {
  baseURL = `${environment.apiUrl}api/Insumos`;

  constructor( private http : HttpClient, private negocioService:NegocioService) { }

  postInsumo(data : any){
    return this.http.post<any>(`${this.baseURL}`,data);
  }

  getInsumos(){
    var negocioId= this.negocioService.getStoredNegocioId()
    return this.http.get<any>(`${this.baseURL}/negocio/${negocioId}`);
  }

  putInsumo(data:any, id : number){
    return this.http.put<any>(`${this.baseURL}/${id}`,data);
  }

  deleteInsumo(id:number){
    return this.http.delete<any>(`${this.baseURL}/${id}`);

  }
}
