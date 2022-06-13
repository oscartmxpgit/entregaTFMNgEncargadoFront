import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CajaService } from 'src/app/services/caja.service';
import { NegocioService } from 'src/app/services/negocio.service';
import { CajaDialogComponent } from '../caja-dialog/caja-dialog.component';
import { PlatoDialogComponent } from '../plato-dialog/plato-dialog.component';

@Component({
  selector: 'app-cajas',
  templateUrl: './cajas.component.html',
  styleUrls: ['./cajas.component.sass']
})
export class CajasComponent implements OnInit {
  range = new FormGroup({
    inicio: new FormControl(),
    fin: new FormControl(),
  });

  estadosList = ['Pendiente', 'Validado', 'Cancelado'];
  displayedColumns: string[] = ['operacion','tipo', 'fechaHora','importe','estado', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  incremento=0;
  decremento=0;
  tasaCrecimiento=0;

  constructor( private dialogm : MatDialog, private snackBar: MatSnackBar, private negocioService: NegocioService, private router: Router, private cajaService : CajaService) {
    this.actualizarIndicadores();
  }

  actualizarIndicadores(){
    var endDate=new Date();
    var startDate=new Date();
    startDate.setDate(startDate.getDate() -90);
    this.cajaService.getTotalcaja()
    .subscribe({
      next : (res: any)=>{
        this.incremento=res.incremento;
        this.decremento=res.decremento;
        this.tasaCrecimiento=res.tasaCrecimiento;
      },
      error:(err)=>{
        alert("Error! " + JSON.stringify(err));
      }
    })
  }

  ngOnInit(): void {
    this.getAllCajas();
  }

  openDialog() {
    this.dialogm.open(CajaDialogComponent, {
      width : '60%'
    }).afterClosed().subscribe(val=>{
      if(val == 'Guardar'){
        this.getAllCajas();
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
        });
      }
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
      });
    })

  }

  editCaja(row : any){
    this.dialogm.open(CajaDialogComponent,{
      width : '60%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val ==='update'){
        this.getAllCajas();
      }
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
      });
    })
  }

  deleteCaja(id:number){
    this.cajaService.deleteCaja(id)
    .subscribe({
      next:()=>{
        this.snackBar.open("Operación eliminada", "Ok", {
          duration: 2000,
        });
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
        });
      },error:()=>{
        alert("error")
      }
    })
  }


  getAllCajas(){
    this.cajaService.getOpCajas()
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

  updateOpCaja(row){
    var now=new Date();
    var idNeg=this.negocioService.getStoredNegocioId();

    var putData={
      ...row,
      idNegocio:idNeg,
    };
    this.cajaService.putCaja(putData,row.idOperacionesCaja)
    .subscribe({
      next : (res)=>{
        this.actualizarIndicadores();
        //this.actualizaPagina();
      },
      error:(err)=>{
        alert("Error" + JSON.stringify(err));
      }
    })
  }

}
