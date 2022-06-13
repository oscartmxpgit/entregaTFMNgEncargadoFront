import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { EvalEmpService } from 'src/app/services/eval-emp.service';
import { NegocioService } from 'src/app/services/negocio.service';

@Component({
  selector: 'app-evaluacion-empleado-dialog',
  templateUrl: './evaluacion-empleado-dialog.component.html',
  styleUrls: ['./evaluacion-empleado-dialog.component.sass']
})
export class EvaluacionEmpleadoDialogComponent implements OnInit {

  evalEmpForm !: FormGroup;
  empleados:any;

  actionBtn : string ="Guardar";
  actionHeader : string ="Crear";

  constructor( private formBuilder : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private negocioService:NegocioService,
    private snackBar: MatSnackBar,
    private empleadoService: EmpleadoService,
    private evalEmpService : EvalEmpService, private dialogRef : MatDialogRef<EvaluacionEmpleadoDialogComponent>) {
      this.empleadoService.getEmpleados()
      .subscribe({
        next : (res: any)=>{
          this.empleados=res;
        },
        error:(err)=>{
          alert("Error! " + JSON.stringify(err));
        }
      })
    }

  ngOnInit(): void {

    this.evalEmpForm = this.formBuilder.group({
      idEmpleado : ['',Validators.required],
      criterio : ['',Validators.required],
      evaluacion : ['',Validators.required],
    });


    if(this.editData){
      this.actionHeader = "Editar";
      this.actionBtn= "Actualizar"
      this.evalEmpForm.controls["idEmpleado"].setValue(this.editData.idEmpleado);
      this.evalEmpForm.controls["criterio"].setValue(this.editData.nombre);
      this.evalEmpForm.controls["evaluacion"].setValue(this.editData.evaluacion);
    }

  }

  addEvalEmp(){
    if(!this.editData){
      if(this.evalEmpForm.valid){
        var idNeg=this.negocioService.getStoredNegocioId();
        var postData={...this.evalEmpForm.value, idNegocio:idNeg};

        this.evalEmpService.postEvalEmpl(postData)
        .subscribe({
          next :(res) => {
            this.snackBar.open("Evaluación añadida", "Ok", {
              duration: 2000,
            });
            this.evalEmpForm.reset();
            this.dialogRef.close('Guardar');
          },
          error:(err)=>{
            alert("Error " + JSON.stringify(err))
          }
        })
      }
    }else{
      this.updateEvalEmp()
    }

  }

  updateEvalEmp(){
    var putData={...this.evalEmpForm.value, idNegocio:this.negocioService.getStoredNegocioId(),idEvalEmp:this.editData.idEvalEmp, idEmpleado:this.editData.idEmpleado};
    console.log("putData")
    console.log(putData)
    this.evalEmpService.putEvalEmpl(putData,this.editData.idEvalEmp)
    .subscribe({
      next : (res)=>{
        this.snackBar.open("EvalEmp modificado", "Ok", {
          duration: 2000,
        });
      this.evalEmpForm.reset
      this.dialogRef.close('update');
      },
      error:(err)=>{
        alert("Error" + JSON.stringify(err));
      }
    })

  }

}
