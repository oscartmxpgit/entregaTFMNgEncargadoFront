import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup , FormBuilder, Validators} from '@angular/forms';
import { NegocioService } from '../../../services/negocio.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../usuarios/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

class FileSnippet {
  static readonly IMAGE_SIZE = {width: 950, height: 720};

  pending: boolean = false;
  status: string = 'INIT';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-dialog-negocio',
  templateUrl: './dialog-negocio.component.html',
  styleUrls: ['./dialog-negocio.component.sass']
})
export class DialogNegocioComponent implements OnInit {

  @Output() imageUploaded = new EventEmitter();
  @Output() imageError = new EventEmitter();
  @Output() imageLoadedToContainer = new EventEmitter();
  @Output() croppingCanceled = new EventEmitter();

  selectedFile: FileSnippet;
  imageChangedEvent: any;

  tipoList=["Cafetería","Restaurante","Bar"]

  negocioForm ! : FormGroup;

  actionBtn : string ="Guardar";
  actionHeader : string ="Crear";

  constructor(private formBuilder : FormBuilder ,
    public auth: AuthService,
    private negocioService:NegocioService,
    private snackBar: MatSnackBar,
    private negocio : NegocioService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogNegocioComponent>,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.negocioForm = this.formBuilder.group({
      nombre: ['',Validators.required],
      direccion: ['',Validators.required],
      tipo: ['',Validators.required],
    });

    if(this.editData){
      this.actionBtn = "Actualizar";
      this.actionHeader = "Editar";
      this.negocioForm.controls['nombre'].setValue(this.editData.nombre);
      this.negocioForm.controls['direccion'].setValue(this.editData.direccion);
      this.negocioForm.controls['tipo'].setValue(this.editData.tipo);
    }
  }

  addNegocio(){
    if(!this.editData){
      var postData={
        "nombre":this.negocioForm.controls['nombre'].value,
        "direccion":this.negocioForm.controls['direccion'].value,
        "tipo":this.negocioForm.controls['tipo'].value,
        "idEncargado": this.auth.getIdEncargado(),
      }

      if(this.negocioForm.valid){
      this.negocio.postNegocio(postData)
      .subscribe({
        next :(res)=>{
          this.snackBar.open("Negocio creado", "Ok", {
            duration: 2000,
            verticalPosition: 'top'
          });
          this.negocioForm.reset();
          this.dialogRef.close('Guardar');
          let currentUrl = this.router.url;
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate([currentUrl]);
            });
        },
        error:(err)=>{
          alert("No se ha podido crear el negocio " + JSON.stringify(err));
        }
      })
    }

    } else {
      this.updateNegocio()
    }

  }

  updateNegocio(){
    var putData={...this.negocioForm.value,
      idNegocio:this.editData.idNegocio,
      idEncargado: this.auth.getIdEncargado(),
    };
    this.negocio.putNegocio(putData,this.editData.idNegocio)
    .subscribe({
      next : (res)=>{
        this.snackBar.open("Negocio modificado con éxito", res, {
          duration: 2000,
        });
      this.negocioForm.reset
      this.dialogRef.close('update');
      },
      error:(err)=>{
        alert("Error " + JSON.stringify(err));
      }
    })
  }

}
