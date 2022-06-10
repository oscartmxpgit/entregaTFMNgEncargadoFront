import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CajaService } from 'src/app/services/caja.service';
import { InsumoService } from 'src/app/services/insumo.service';
import { NegocioService } from 'src/app/services/negocio.service';

@Component({
  selector: 'app-insumos-dialog',
  templateUrl: './insumos-dialog.component.html',
  styleUrls: ['./insumos-dialog.component.sass']
})
export class InsumosDialogComponent implements OnInit {

  insumoForm !: FormGroup;
  pasadoCaja=false;

  actionBtn : string ="Guardar";
  actionHeader : string ="Crear";

  constructor( private formBuilder : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private negocioService:NegocioService,
    private snackBar: MatSnackBar,
    private cajaService:CajaService,
    private insumoService : InsumoService, private dialogRef : MatDialogRef<InsumosDialogComponent>) { }

  ngOnInit(): void {

    this.insumoForm = this.formBuilder.group({
      nombre : ['',Validators.required],
      stock : ['',Validators.required],
      precio : ['',Validators.required],
      estado : ['',Validators.required],
    });


    if(this.editData){
      this.actionHeader = "Editar";
      this.actionBtn= "Actualizar"
      this.insumoForm.controls["nombre"].setValue(this.editData.nombre);
      this.insumoForm.controls["stock"].setValue(this.editData.stock);
      this.insumoForm.controls["precio"].setValue(this.editData.precio);
      this.insumoForm.controls["estado"].setValue(this.editData.estado);

      if (this.editData.estado=="Pagado")
        this.pasadoCaja=true;
    }

  }

  addInsumo(){
    if(!this.editData){
      if(this.insumoForm.valid){
        var idNeg=this.negocioService.getStoredNegocioId();
        var postData={...this.insumoForm.value, idNegocio:idNeg};
        this.insumoService.postInsumo(postData)
        .subscribe({
          next :(res) => {
            this.snackBar.open("Insumo creado", "Ok", {
              duration: 2000,
            });
            this.insumoForm.reset();
            this.dialogRef.close('Guardar');
          },
          error:(err)=>{
            alert("Error " + JSON.stringify(err))
          }
        })
      }
    }else{
      this.updateInsumo()
    }

  }

  updateInsumo(){
    var putData={...this.insumoForm.value, idNegocio:this.negocioService.getStoredNegocioId(),idInsumo:this.editData.idInsumo};

    this.insumoService.putInsumo(putData,this.editData.idInsumo)
    .subscribe({
      next : (res)=>{
        this.snackBar.open("Insumo modificado", "Ok", {
          duration: 2000,
        });
      this.insumoForm.reset
      this.dialogRef.close('update');
      },
      error:(err)=>{
        alert("Error" + JSON.stringify(err));
      }
    })

  }

  pasaraCaja(){
    var now=new Date();
    var opCaja={operacion:"Compra de insumo",
      producto:this.insumoForm.controls["nombre"].value,
      importe:this.insumoForm.controls["precio"].value,
      cantidad:this.insumoForm.controls["stock"].value,
      fechaHora:now,
      tipo:"Decremento",
      estado:"Pendiente", //Pendiente, Validado, Cancelado
      idNegocio:this.negocioService.getStoredNegocioId()};
    this.cajaService.postCaja(opCaja).subscribe(data => { })
    this.insumoForm.controls["estado"].setValue("Pagado");
    this.updateInsumo();
    //this.dialogRef.close('pagado');
  }
}
