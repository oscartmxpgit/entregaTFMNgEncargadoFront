import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup , FormBuilder,Validators} from '@angular/forms';
import { PlatoService } from '../../../services/plato.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NegocioService } from 'src/app/services/negocio.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-platodialog',
  templateUrl: './plato-dialog.component.html',
  styleUrls: ['./plato-dialog.component.sass']
})
export class PlatoDialogComponent implements OnInit {

  platoForm !: FormGroup;

  actionBtn : string ="Guardar";
  actionHeader : string ="Crear";

  constructor( private formBuilder : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private negocioService:NegocioService,
    private snackBar: MatSnackBar,
    private platoService : PlatoService, private dialogRef : MatDialogRef<PlatoDialogComponent>) { }

  ngOnInit(): void {

    this.platoForm = this.formBuilder.group({
      nombre : ['',Validators.required],
      precio : ['',Validators.required],
      stock : ['',Validators.required],
    });


    if(this.editData){
      this.actionHeader = "Editar";
      this.actionBtn= "Actualizar"
      this.platoForm.controls["nombre"].setValue(this.editData.nombre);
      this.platoForm.controls["precio"].setValue(this.editData.precio);
      this.platoForm.controls["stock"].setValue(this.editData.stock);
    }

  }

  addPlato(){
    if(!this.editData){
      if(this.platoForm.valid){
        var idNeg=this.negocioService.getStoredNegocioId();
        var postData={...this.platoForm.value, idNegocio:idNeg};
        this.platoService.postPlato(postData)
        .subscribe({
          next :(res) => {
            this.snackBar.open("Plato creado", "Ok", {
              duration: 2000,
            });
            this.platoForm.reset();
            this.dialogRef.close('Guardar');
          },
          error:(err)=>{
            alert("Error " + JSON.stringify(err))
          }
        })
      }
    }else{
      this.updatePlato()
    }

  }

  updatePlato(){
    var putData={...this.platoForm.value, idNegocio:this.negocioService.getStoredNegocioId(),idPlato:this.editData.idPlato};

    this.platoService.putPlato(putData,this.editData.idPlato)
    .subscribe({
      next : (res)=>{
        this.snackBar.open("Plato modificado", "Ok", {
          duration: 2000,
        });
      this.platoForm.reset
      this.dialogRef.close('update');
      },
      error:(err)=>{
        alert("Error" + JSON.stringify(err));
      }
    })

  }

}
