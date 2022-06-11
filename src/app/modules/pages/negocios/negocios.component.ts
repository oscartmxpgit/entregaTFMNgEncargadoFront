import { Component, OnInit , ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';


import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NegocioService } from 'src/app/services/negocio.service';
import { DialogNegocioComponent } from '../negocio-dialog/dialog-negocio.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../usuarios/services/auth.service';

@Component({
  selector: 'app-negocios',
  templateUrl: './negocios.component.html',
  styleUrls: ['./negocios.component.sass']
})
export class NegociosComponent implements OnInit {

  displayedColumns: string[] = ['nombre','direccion','tipo','acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog :MatDialog, private auth: AuthService, private snackBar: MatSnackBar, private neg : NegocioService, private router : Router) { }

  ngOnInit(): void {
    this.getNegociosPorEncargado();
  }

  openDialog() {
    this.dialog.open(DialogNegocioComponent, {
      width : '65%'
    }).afterClosed().subscribe(val=>{
      if(val == 'Guardar'){
        this.getNegociosPorEncargado();
      }
      window.location.reload();
    })
  }

  getNegociosPorEncargado(){
    if (this.auth.getIdEncargado()!=null){
      this.neg.getNegociosPorEncargadoId()
      .subscribe({
        next :(res)=>{
         this.dataSource = new MatTableDataSource(res);
         this.dataSource.paginator = this. paginator;
         this.dataSource.sort = this.sort;
        },
        error:(err) =>{
          alert("error!")

        }
      })
    }
  }

  editNegocio(row : any){
    this.dialog.open(DialogNegocioComponent,{
      width : '65%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val ==='update'){
        this.getNegociosPorEncargado();
      }
    })
  }

  deleteNegocio(id:number){
    this.neg.deleteNegocio(id)
    .subscribe({
      next:(res)=>{
        this.snackBar.open("Negocio eliminado", "Ok", {
          duration: 2000,
        });
        window.location.reload();
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


}

