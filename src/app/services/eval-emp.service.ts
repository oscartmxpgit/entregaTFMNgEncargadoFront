import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NegocioService } from './negocio.service';

@Injectable({
  providedIn: 'root'
})
export class EvalEmpService {
  baseURL = `${environment.apiUrl}api/EvaluacionEmpleados`;

  constructor( private http : HttpClient, private negocioService:NegocioService) { }

  postEvalEmpl(data : any){
    return this.http.post<any>(`${this.baseURL}`,data);
  }

  getEvaluacionEmpleados(){
    var negocioId= this.negocioService.getStoredNegocioId()
    return this.http.get<any>(`${this.baseURL}/negocio/${negocioId}`);
  }

  putEvalEmpl(data:any, id : number){
    return this.http.put<any>(`${this.baseURL}/${id}`,data);
  }

  deleteEvalEmpl(id:number){
    return this.http.delete<any>(`${this.baseURL}/${id}`);

  }
}
