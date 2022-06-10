import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EncargadoService } from 'src/app/services/encargado.service';
import { Encargado } from 'src/app/shared/models/encargado';
import { AuthService } from '../services/auth.service';
import { UsuarioDialogComponent } from '../usuario-dialog/usuario-dialog.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.sass']
})
export class UsuarioComponent implements OnInit {
  username = "";
  encargado: any;
  nombre: string;
  isLoaded = false;

  encargadoForm !: FormGroup;

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private formBuilder: FormBuilder, public auth: AuthService, public encargadoService: EncargadoService) {
    this.username = auth?.getUsername();
    this.encargadoService.getEncargadoPorDni(this.username)
    .subscribe({
      next :(res) => {
          this.encargado = res;
          this.isLoaded = true;
      },
      error:(err)=>{
        alert("Error " + JSON.stringify(err))
      }
    });
  }

  ngOnInit() {
  }

  cambiarDatos() {
    this.encargadoService.putEncargado(this.encargadoForm.value, this.encargado.idEncargado)
      .subscribe({
        next: (res) => {
          this.snackBar.open("Encargado modificado con éxito", "Ok", {
            duration: 2000,
          });
        },
        error: (err) => {
          alert("Error" + JSON.stringify(err));
        }
      })
  }

  editUsuario(row: any) {
    this.dialog.open(UsuarioDialogComponent, {
      width: '60%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        //this.getNegociosPorEncargado();
      }
    })
  }

}

