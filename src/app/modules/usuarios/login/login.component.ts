import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errors: any[] = [];
  notifyMessage: string = '';


  username: string;
  password: string;

  error: any
  mensajeError: any;
  loading: any;
  logged=false;

  constructor(@Inject(DOCUMENT) private domDocument: Document,
    private fb: FormBuilder,
    private auth: AuthService,
    private router:Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();


    this.route.params.subscribe((params) => {
      if (params['registered'] === 'success') {
        this.notifyMessage = 'Usuario registrado correctamente. Ahora puedes entrar';
      }
    })
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required,]],
      password: ['', Validators.required]
    })
  }

  isInvalidForm(fieldName): boolean {
    return this.loginForm.controls[fieldName].invalid &&
           (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched)
  }


  isRequired(fieldName): boolean {
    return this.loginForm.controls[fieldName].errors.required
  }

  login() {
    this.auth.login(this.loginForm.value).subscribe(
      (response) => {
        localStorage.removeItem('ecarta_idNegocio');
        //angular reload component
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.snackBar.open("Bienvenido eCarta", "Elige un negocio para continuar", {
            duration: 2000,
          });
         });
         setTimeout(() => {this.domDocument.location.reload()}, 1000);
         //window.location.reload();
      },
      (errorResponse) => {
        this.error = errorResponse.error;
        console.log(this.errors);
      })
  }
}
