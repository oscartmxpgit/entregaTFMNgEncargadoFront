import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import 'rxjs/Rx';
import { environment } from 'src/environments/environment';

const jwt = new JwtHelperService();

class DecodedToken {
  exp: number = 0;
  username: string = '';
}

@Injectable()
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}api/autenticacion`;
  private readonly apiEncargado = `${environment.apiUrl}api/Encargados/Dni`;
  private decodedToken;

  constructor(private http: HttpClient) {

    this.decodedToken = JSON.parse(localStorage.getItem('ecarta_meta')) || new DecodedToken();
  }

  private saveToken(token: string): string {
    this.decodedToken = jwt.decodeToken(token);
    localStorage.setItem('ecarta_auth', token);
    localStorage.setItem('ecarta_meta', JSON.stringify(this.decodedToken));

    return token;
  }

  private getExpiration() {
    return moment.unix(this.decodedToken.exp);
  }

  public login(userData: any): Observable<any> {
    let postData = {username : userData.username ,password :userData.password};

    return this.http.post(`${this.apiUrl}/encargadoLogin`, postData).pipe(map(
      (response: any) => {
        if (response) {
          this.saveToken(response.accessToken);
          this.storeIdEncargado(userData.username);
        }
      }));
  }

  public storeIdEncargado(dniEncargado:string){
    this.http.get<any>(`${this.apiEncargado}/${dniEncargado}`).subscribe(data => {
      localStorage.setItem('ecarta_idEncargado', data.idEncargado);
    });
  }

  public logout() {
    localStorage.clear();
    this.decodedToken = new DecodedToken();
  }

  public isAuthenticated(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  public getAuthToken(): string {
    return localStorage.getItem('ecarta_auth');
  }

  public getUsername() {
    return this.decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
  }

  public getIdEncargado(): string {
    return localStorage.getItem('ecarta_idEncargado');
  }

}
