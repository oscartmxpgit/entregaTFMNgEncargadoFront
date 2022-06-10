import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup , FormBuilder,Validators} from '@angular/forms';
import { MesaService } from '../../../services/mesa.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NegocioService } from 'src/app/services/negocio.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ReplaySubject } from 'rxjs-compat';

@Component({
  selector: 'app-mesadialog',
  templateUrl: './mesadialog.component.html',
  styleUrls: ['./mesadialog.component.sass']
})
export class MesadialogComponent implements OnInit,AfterViewInit {
  mesaForm !: FormGroup;
  numMesa=1;

  actionBtn : string ="Guardar";
  actionHeader : string ="Crear";

  constructor( private formBuilder : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private negocioService:NegocioService,
    private snackBar: MatSnackBar,
    private ms : MesaService, private dialogRef : MatDialogRef<MesadialogComponent>) {

    }

  ngAfterViewInit(): void {
  }

  ngOnInit() {
    if(isNaN(this.editData)){
      this.mesaForm = this.formBuilder.group({
        noMesa : ['',Validators.required],
        personas : ['',Validators.required],
      });

      this.actionHeader = "Editar";
      this.actionBtn= "Actualizar"
      this.mesaForm.controls["noMesa"].setValue(this.editData.noMesa);
      this.mesaForm.controls["personas"].setValue(this.editData.personas);
    }
    else{
      this.mesaForm = this.formBuilder.group({
        noMesa : [this.editData+1,Validators.required],
        personas : ['',Validators.required],
      });
    }
  }

  addMesa(){
    if(!isNaN(this.editData)){
      if(this.mesaForm.valid){
        var idNeg=this.negocioService.getStoredNegocioId();
        var postData={...this.mesaForm.value, idNegocio:idNeg};
        this.ms.postMesa(postData)
        .subscribe({
          next :(res) => {
            this.snackBar.open("Mesa creada", "Ok", {
              duration: 2000,
            });
            this.mesaForm.reset();
            this.dialogRef.close('Guardar');
          },
          error:(err)=>{
            alert("Error " + JSON.stringify(err))
          }
        })
      }
    }else{
      this.updateMesa()
    }
  }

  updateMesa(){
    var putData={...this.mesaForm.value, idNegocio:this.negocioService.getStoredNegocioId(),idMesa:this.editData.idMesa};
    this.ms.putMesa(putData,this.editData.idMesa)
    .subscribe({
      next : (res)=>{
        this.snackBar.open("Mesa modificada", "Ok", {
          duration: 2000,
        });
      this.mesaForm.reset
      this.dialogRef.close('update');
      },
      error:(err)=>{
        alert("Error" + JSON.stringify(err));
      }
    })

  }

}
