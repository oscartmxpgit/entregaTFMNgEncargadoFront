import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { EncargadoService } from 'src/app/services/encargado.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  formData: any = {};
  errors:string[]=[];

  constructor(private encargado: EncargadoService,
              private router: Router) { }

  ngOnInit() {
    this.errors=[];
  }

  register() {
    this.errors=[];
    var dni=this.formData.dni;
    if (dni.length!=9)
    {
      this.errors.push("No es un DNI válido");
    }
    if (!this.validEmail(this.formData.correo))
    {
       this.errors.push("No es un correo electrónico válido");

    }
    if (this.formData.pass!=this.formData.passwordConfirmation)
    {
      this.errors.push("Las contraseñas no coinciden");
    }
    if (this.errors==undefined|| this.errors.length==0)
      this.encargado.postEncargado(this.formData).subscribe(
        () => {
          this.router.navigate(['/login', {registered: 'success'}]);
        },
        (errorResponse) => {
          this.errors.push("Ya existe un encargado con ese Dni, prueba con otro");
        })
  }

  validEmail(email:string){
      return email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
  }
}
