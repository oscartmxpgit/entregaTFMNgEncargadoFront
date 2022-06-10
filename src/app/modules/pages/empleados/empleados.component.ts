import { Component, OnInit , ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';import { EmpleadoDialogComponent } from '../empleado-dialog/empleado-dialog.component';
import { EvaluacionEmpleadoDialogComponent } from '../evaluacion-empleado-dialog/evaluacion-empleado-dialog.component';
import { EvaluacionEmpleadoComponent } from '../evaluacion-empleado/evaluacion-empleado.component';
;


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.sass']
})
export class EmpleadosComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'telefono', 'email','acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private dialog :MatDialog, private snackBar: MatSnackBar, private router: Router, private emp : EmpleadoService,
    public _MatPaginatorIntl: MatPaginatorIntl) { }

  ngOnInit(): void {
    this.getAllEmpleados();

    this._MatPaginatorIntl.itemsPerPageLabel = 'Elementos por página';
    this._MatPaginatorIntl.firstPageLabel = 'Primera página';
    this._MatPaginatorIntl.itemsPerPageLabel = 'Items por página';
    this._MatPaginatorIntl.lastPageLabel = 'Última página';
    this._MatPaginatorIntl.nextPageLabel = 'Siguiente página';
    this._MatPaginatorIntl.previousPageLabel = 'Página anterior';
  }

  openDialog() {
    this.dialog.open(EmpleadoDialogComponent, {
      width : '50%'
    }).afterClosed().subscribe(val=>{
      if(val == 'Guardar'){
        this.getAllEmpleados();
      }
    })
  }

  getAllEmpleados(){
    this.emp.getEmpleados()
    .subscribe({
      next :(res)=>{

       this.dataSource = new MatTableDataSource(res);
       this.dataSource.paginator = this. paginator;
       this.dataSource.sort = this.sort;
      },
      error:(err) =>{
        alert("Error! " + JSON.stringify(err));

      }
    })

  }

  evaluateEmpleado(row : any){
    this.dialog.open(EvaluacionEmpleadoDialogComponent,{
      width : '50%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val ==='update'){
        this.getAllEmpleados();
      }
    })
  }

  editEmpleado(row : any){
    this.dialog.open(EmpleadoDialogComponent,{
      width : '50%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val ==='update'){
        this.getAllEmpleados();
      }
    })
  }

  deleteEmpleado(id:number){
    this.emp.deleteEmpleado(id)
    .subscribe({
      next:(res)=>{
        this.snackBar.open("Empleado eliminado", "Ok", {
          duration: 2000,
        });
      },error:()=>{

        alert("error")

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

  EvaluaEmpleado(){
    this.router.navigateByUrl('/evalEmp');
  }


}
