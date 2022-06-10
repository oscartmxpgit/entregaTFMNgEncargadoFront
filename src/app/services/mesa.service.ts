import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NegocioService } from './negocio.service';

@Injectable({
  providedIn: 'root'
})
export class MesaService {
  baseURL = `${environment.apiUrl}api/mesas`;

  constructor( private http : HttpClient, private negocioService: NegocioService) { }

  postMesa(data : any){
    return this.http.post<any>(`${this.baseURL}`,data);
  }

  getMesas(){
    var negocioId= this.negocioService.getStoredNegocioId()
    return this.http.get<any>(`${this.baseURL}/negocio/${negocioId}`);
  }

  putMesa(data:any, id : number){
    return this.http.put<any>(`${this.baseURL}/${id}`,data);
  }

  deleteMesa(id:number){
    return this.http.delete<any>(`${this.baseURL}/${id}`);

  }
}
