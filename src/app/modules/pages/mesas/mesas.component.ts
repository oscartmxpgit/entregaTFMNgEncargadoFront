import { Component, OnInit , ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';


import {MatPaginator} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { MesaService } from 'src/app/services/mesa.service';
import { MesadialogComponent } from '../mesa-dialog/mesadialog.component';


@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.sass']
})
export class MesasComponent implements OnInit {

  displayedColumns: string[] = ['noMesa', 'personas', 'estadoPedido', 'acciones'];
  dataSource!: MatTableDataSource<any>;
  numMesas=1;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private dialogm : MatDialog, private snackBar: MatSnackBar, private router: Router, private ms : MesaService) { }

  ngOnInit(): void {
    this.getAllMesas();
  }

  estadoPedido(estadoPedido){
    var estado="No definido";
    switch(estadoPedido) {
      case "1":
         estado="Tomando pedido";
         break;
      case "2":
        estado= "En preparación"
        break;
      case "3":
        estado= "Pendiente de pago"
        break;
      case "4":
        estado= "Cobrado"
        break;
    }
    return estado;
  }

  deleteMesa(id:number){
    this.ms.deleteMesa(id)
    .subscribe({
      next:()=>{
        this.snackBar.open("Mesa eliminada", "Ok", {
          duration: 2000,
        });
        this.actualizaPagina();
      },error:()=>{
        alert("error")
      }
    })
  }


  openDialog() {
      this.dialogm.open(MesadialogComponent, {
        width : '60%',
        data:this.dataSource.data.length
      }).afterClosed().subscribe(val=>{
        if(val == 'Guardar'){
          this.getAllMesas();
        }
      })
  }

  getAllMesas(){
    this.ms.getMesas()
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

  editMesa(row : any){
    this.dialogm.open(MesadialogComponent,{
      width : '60%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val ==='update'){
        this.getAllMesas();
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
