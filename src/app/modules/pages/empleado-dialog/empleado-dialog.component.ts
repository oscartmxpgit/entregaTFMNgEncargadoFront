import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup , FormBuilder, Validators} from '@angular/forms';
import { EmpleadoService } from '../../../services/empleado.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from '../../usuarios/services/auth.service';
import { NegocioService } from 'src/app/services/negocio.service';

@Component({
  selector: 'app-empleado-dialog',
  templateUrl: './empleado-dialog.component.html',
  styleUrls: ['./empleado-dialog.component.sass']
})
export class EmpleadoDialogComponent implements OnInit {

  rolList=["Encargado","Cajero","Cocinero","Camarero"]

  empleadoForm !: FormGroup;

  actionBtn : string ="Guardar";
  actionHeader : string ="Crear";

  loading = false;
  errorMessage = "";

  constructor(private formBuilder : FormBuilder ,
    private emp : EmpleadoService,
    private snackBar: MatSnackBar,
    private auth: AuthService,
    private negocioService:NegocioService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<EmpleadoDialogComponent>) { }

  ngOnInit(): void {

    this.empleadoForm = this.formBuilder.group({
      dni: ['',Validators.required],
      nombre: ['',Validators.required],
      telefono: ['',Validators.required],
      email: ['',Validators.required],
      pass1: ['',Validators.required],
      pass2: ['',Validators.required],
    });

    if(this.editData){
      this.actionBtn = "Actualizar";
      this.actionHeader = "Editar";
      this.empleadoForm.controls['dni'].setValue(this.editData.dni);
      this.empleadoForm.controls['nombre'].setValue(this.editData.nombre);
      this.empleadoForm.controls['telefono'].setValue(this.editData.telefono);
      this.empleadoForm.controls['email'].setValue(this.editData.email);
      this.empleadoForm.controls['pass1'].setValue(this.editData.pass);
      this.empleadoForm.controls['pass2'].setValue(this.editData.pass);
    }
  }

  addEmpleado(){
    var pass1=this.empleadoForm.controls['pass1'].value;
    var pass2=this.empleadoForm.controls['pass2'].value;
    if (pass1.length==0 || pass1!=pass2)
    {
      this.errorMessage = "Las contraseñas no coinciden";
      return;
    }
    this.loading = true;
    this.errorMessage = "";

    if(!this.editData){
      if(this.empleadoForm.valid){

      var empleadoData={
        dni:this.empleadoForm.controls['dni'].value,
        nombre:this.empleadoForm.controls['nombre'].value,
        telefono:this.empleadoForm.controls['telefono'].value,
        email:this.empleadoForm.controls['email'].value,
        pass:this.empleadoForm.controls['pass1'].value,
        idNegocio:this.negocioService.getStoredNegocioId()
      }

      this.emp.postEmpleado(empleadoData)
      .subscribe(
        (response) =>{
          this.snackBar.open("Empleado creado", "Ok", {
            duration: 2000,
          });
          this.empleadoForm.reset();
          this.dialogRef.close('Guardar');
        },
        (error)=>{
          this.errorMessage = error;
          this.loading = false;
          alert("Error" + JSON.stringify(error));
      })
    }

    } else {
      this.updateEmpleado()
    }

  }

  updateEmpleado(){
    var pass1=this.empleadoForm.controls['pass1'].value;
    var pass2=this.empleadoForm.controls['pass2'].value;
    if (pass1!=pass2)
    {
      this.errorMessage = "Las contraseñas no coinciden";
      return;
    }

    var putData={...this.empleadoForm.value, pass:pass1, idNegocio:this.negocioService.getStoredNegocioId(),idEmpleado:this.editData.idEmpleado};
    this.emp.putEmpleado(putData,this.editData.idEmpleado)

    .subscribe({
      next : (res)=>{
        this.snackBar.open("Empleado modificado con éxito", res, {
          duration: 2000,
        });
      this.empleadoForm.reset
      this.dialogRef.close('update');
      },
      error:(err)=>{
        alert("Error" + JSON.stringify(err));
      }
    })
  }


}
