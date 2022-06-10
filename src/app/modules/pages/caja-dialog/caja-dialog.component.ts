import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CajaService } from 'src/app/services/caja.service';
import { NegocioService } from 'src/app/services/negocio.service';

@Component({
  selector: 'app-caja-dialog',
  templateUrl: './caja-dialog.component.html',
  styleUrls: ['./caja-dialog.component.sass']
})
export class CajaDialogComponent implements OnInit {

  cajaForm !: FormGroup;

  actionBtn : string ="Guardar";
  actionHeader : string ="Crear";

  constructor( private formBuilder : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private negocioService:NegocioService,
    private snackBar: MatSnackBar,
    private cajaService : CajaService, private dialogRef : MatDialogRef<CajaDialogComponent>) { }

  ngOnInit(): void {

    this.cajaForm = this.formBuilder.group({
      operacion : ['',Validators.required],
      importe : ['',Validators.required],
      producto : ['',Validators.required],
      cantidad : ['',Validators.required],
      tipo : ['',Validators.required],
      estado : ['',Validators.required],
    });


    if(this.editData){
      this.actionHeader = "Editar";
      this.actionBtn= "Actualizar"
      this.cajaForm.controls["operacion"].setValue(this.editData.operacion);
      this.cajaForm.controls["importe"].setValue(this.editData.importe);
      this.cajaForm.controls["producto"].setValue(this.editData.producto);
      this.cajaForm.controls["cantidad"].setValue(this.editData.cantidad);
      this.cajaForm.controls["tipo"].setValue(this.editData.tipo);
      this.cajaForm.controls["estado"].setValue(this.editData.estado);
    }

  }

  addCaja(){
    if(!this.editData){
      if(this.cajaForm.valid){
        var idNeg=this.negocioService.getStoredNegocioId();
        var now=new Date();
        var postData={
          ...this.cajaForm.value,
          fechaHora:now,
          producto:"-",
          cantidad:1,
          idNegocio:idNeg
        };
        this.cajaService.postCaja(postData)
        .subscribe({
          next :(res) => {
            this.snackBar.open("Operación de caja creada", "Ok", {
              duration: 2000,
            });
            this.cajaForm.reset();
            this.dialogRef.close('Guardar');
          },
          error:(err)=>{
            alert("Error " + JSON.stringify(err))
          }
        })
      }
    }else{
      this.updateCaja()
    }

  }

  updateCaja(){
    var now=new Date();
    var idNeg=this.negocioService.getStoredNegocioId();

    var putData={
      ...this.cajaForm.value,
      fechaHora:now,
      idNegocio:idNeg,
      idOperacionesCaja:this.editData.idOperacionesCaja
    };
    this.cajaService.putCaja(putData,this.editData.idOperacionesCaja)
    .subscribe({
      next : (res)=>{
        this.snackBar.open("Caja modificada", "Ok", {
          duration: 2000,
        });
      this.cajaForm.reset
      this.dialogRef.close('update');
      },
      error:(err)=>{
        alert("Error" + JSON.stringify(err));
      }
    })

  }

}
