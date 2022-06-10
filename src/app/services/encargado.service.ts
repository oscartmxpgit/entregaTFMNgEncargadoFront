import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat';
import { environment } from 'src/environments/environment';
import { AuthService } from '../modules/usuarios/services/auth.service';
import { Encargado } from '../shared/models/encargado';
import { NegocioService } from './negocio.service';

@Injectable({
  providedIn: 'root'
})
export class EncargadoService {
  baseURL = `${environment.apiUrl}api/Encargados`;

  constructor( private http : HttpClient) { }

  postEncargado(data : any){
    return this.http.post<any>(`${this.baseURL}`,data);
  }

  getEncargados(){
    return this.http.get<any>(`${this.baseURL}`);
  }

  getEncargadoPorDni(Dni: string) {
    return this.http.get<Encargado>(`${this.baseURL}/Dni/${Dni}`);
  }

  putEncargado(data:any, id : number){
    return this.http.put<any>(`${this.baseURL}/${id}`,data);
  }

  changePasswd(data:any){
    console.log("changePasswdData");
      console.log(data);
      console.log(`${this.baseURL}/ChangePassword`);
    return this.http.post<any>(`${this.baseURL}/ChangePassword`,data);
  }

  deleteEncargado(id:number){
    return this.http.delete<any>(`${this.baseURL}/${id}`);

  }
}
