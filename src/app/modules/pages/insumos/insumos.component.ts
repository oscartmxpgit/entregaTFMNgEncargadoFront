import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { InsumoService } from 'src/app/services/insumo.service';
import { NegocioService } from 'src/app/services/negocio.service';
import { InsumosDialogComponent } from '../insumos-dialog/insumos-dialog.component';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.sass']
})
export class InsumosComponent implements OnInit {
  estadosList = ['Pagado', 'Pendiente'];

  displayedColumns: string[] = ['nombre','stock','precio', 'estado', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private dialogm : MatDialog, private snackBar: MatSnackBar, private negocioService:NegocioService, private router: Router, private insumoService : InsumoService) { }

  ngOnInit(): void {
    this.getAllInsumos();
  }

  deleteInsumo(id:number){
    this.insumoService.deleteInsumo(id)
    .subscribe({
      next:()=>{
        this.snackBar.open("Insumo eliminado", "Ok", {
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

  openDialog() {
    this.dialogm.open(InsumosDialogComponent, {
      width : '60%'
    }).afterClosed().subscribe(val=>{
      if(val == 'Guardar'){
        this.getAllInsumos();
      }
    })

  }

  getAllInsumos(){
    this.insumoService.getInsumos()
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

  editInsumo(row : any){
    this.dialogm.open(InsumosDialogComponent,{
      width : '60%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val ==='update'){
        this.getAllInsumos();
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

  updateInsumo(row : any){
    var putData={...row, idNegocio:this.negocioService.getStoredNegocioId()};

    this.insumoService.putInsumo(putData,row.idInsumo)
    .subscribe({
      next : (res)=>{
      },
      error:(err)=>{
        alert("Error" + JSON.stringify(err));
      }
    })
  }
}
