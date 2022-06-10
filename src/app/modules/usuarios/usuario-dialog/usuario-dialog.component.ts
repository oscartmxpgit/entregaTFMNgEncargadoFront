
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup , FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../usuarios/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EncargadoService } from 'src/app/services/encargado.service';
import { Router } from '@angular/router';

class FileSnippet {
  static readonly IMAGE_SIZE = {width: 950, height: 720};

  pending: boolean = false;
  status: string = 'INIT';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-usuario-dialog',
  templateUrl: './usuario-dialog.component.html',
  styleUrls: ['./usuario-dialog.component.sass']
})
export class UsuarioDialogComponent implements OnInit {

  @Output() imageUploaded = new EventEmitter();
  @Output() imageError = new EventEmitter();
  @Output() imageLoadedToContainer = new EventEmitter();
  @Output() croppingCanceled = new EventEmitter();

  selectedFile: FileSnippet;
  imageChangedEvent: any;

  usuarioForm ! : FormGroup;

  actionBtn : string ="Guardar";

  constructor(private formBuilder : FormBuilder ,
    public auth: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private usuario : EncargadoService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<UsuarioDialogComponent>,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group({
      nombre: ['',Validators.required],
      correo: ['',Validators.required],
      telefono: ['',Validators.required],
      oldPass: ['',],
      newPass1: ['',],
      newPass2: ['',],
    });

    this.usuarioForm.controls['nombre'].setValue(this.editData.nombre);
    this.usuarioForm.controls['correo'].setValue(this.editData.correo);
    this.usuarioForm.controls['telefono'].setValue(this.editData.telefono);
  }

  updateusuario(){
    var putData=this.usuarioForm.value;
    putData = { ...putData, idEncargado: this.editData.idEncargado, pass:this.editData.pass, dni: this.editData.dni};

    this.usuario.putEncargado(putData,this.editData.idEncargado)
    .subscribe({
      next : (res)=>{
        this.snackBar.open("Usuario modificado con éxito", "Ok", {
          duration: 2000,
          verticalPosition: 'top'
        });
      }});

    var oldPass=this.usuarioForm.controls['oldPass'].value;
    var newPass1=this.usuarioForm.controls['newPass1'].value;
    var newPass2=this.usuarioForm.controls['newPass2'].value;
    if(oldPass.length>0 && newPass1.length>0 && newPass1==newPass2){
      var changePasswdData={
        username:this.editData.dni,
        oldPass:oldPass,
        newPass:newPass1,
      }

      this.usuario.changePasswd(changePasswdData)
        .subscribe({
          next : (res)=>{
            this.snackBar.open("Contraseña modificada con éxito", "Ok", {
              duration: 2000,
              verticalPosition: 'top'
            });
          }});

    this.usuarioForm.reset;
    this.dialogRef.close('update');
    this.dialogRef.close('Guardar');
    let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
      });
    }
  }

}
