import { Component, OnInit , ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';


import {MatPaginator} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { PlatoService } from 'src/app/services/plato.service';
import { PlatoDialogComponent } from '../plato-dialog/plato-dialog.component';

@Component({
  selector: 'app-platos',
  templateUrl: './platos.component.html',
  styleUrls: ['./platos.component.sass']
})
export class PlatosComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'precio', 'stock', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private dialogm : MatDialog, private snackBar: MatSnackBar, private router: Router, private platoService : PlatoService) { }

  ngOnInit(): void {

    this.getAllPlatos();
  }

  deletePlato(id:number){
    this.platoService.deletePlato(id)
    .subscribe({
      next:()=>{
        this.snackBar.open("Plato eliminado", "Ok", {
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
    this.dialogm.open(PlatoDialogComponent, {
      width : '60%'
    }).afterClosed().subscribe(val=>{
      if(val == 'Guardar'){
        this.getAllPlatos();
      }
    })

  }

  getAllPlatos(){
    this.platoService.getPlatos()
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

  editPlato(row : any){
    this.dialogm.open(PlatoDialogComponent,{
      width : '60%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val ==='update'){
        this.getAllPlatos();
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
