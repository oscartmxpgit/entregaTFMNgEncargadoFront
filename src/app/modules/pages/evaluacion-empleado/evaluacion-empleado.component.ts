import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { EvalEmpService } from 'src/app/services/eval-emp.service';
import { EvaluacionEmpleadoDialogComponent } from '../evaluacion-empleado-dialog/evaluacion-empleado-dialog.component';
import { InsumosDialogComponent } from '../insumos-dialog/insumos-dialog.component';

@Component({
  selector: 'app-evaluacion-empleado',
  templateUrl: './evaluacion-empleado.component.html',
  styleUrls: ['./evaluacion-empleado.component.sass']
})
export class EvaluacionEmpleadoComponent implements OnInit {

  displayedColumns: string[] = ['empleado','criterio', 'evaluacion', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  empleados: any;
  dniEmpleados: any;

  constructor(private empleadoService:EmpleadoService, private snackBar: MatSnackBar, private dialogm : MatDialog, private router: Router, private evalEncargService : EvalEmpService) {
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

  nombrePorIdEmpleado(id){
    var rst=this.empleados
      .filter(function(data) { return data.idEmpleado == id })
      .map(function(x){return {value: x.nombre} });

    return rst[0].value;
  }

  ngOnInit(): void {

    this.getAllEvaluacionEmpleados();
  }

  deleteEvEmp(id:number){
    this.evalEncargService.deleteEvalEmpl(id)
    .subscribe({
      next:()=>{
        this.snackBar.open("Evaluación eliminada", "Ok", {
          duration: 2000,
        });
      },error:()=>{
        alert("error")
      }
    })
  }

  openDialog() {
    this.dialogm.open(EvaluacionEmpleadoDialogComponent, {
      width : '60%'
    }).afterClosed().subscribe(val=>{
      if(val == 'Guardar'){
        this.getAllEvaluacionEmpleados();
      }
    })

  }

  getAllEvaluacionEmpleados(){
    this.evalEncargService.getEvaluacionEmpleados()
    .subscribe({
      next : (res: any[])=>{
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this. paginator;
          this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("Error! " + JSON.stringify(err));
      }

    })

  }

  editEvEmp(row : any){
    this.dialogm.open(EvaluacionEmpleadoDialogComponent,{
      width : '60%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val ==='update'){
        this.getAllEvaluacionEmpleados();
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  actualizaPagina(){
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
     });
  }


}
