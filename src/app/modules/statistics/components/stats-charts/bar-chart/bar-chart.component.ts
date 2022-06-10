import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { OperacionCaja } from 'src/app/modules/usuarios/models/OperacionCaja';
import { CajaService } from 'src/app/services/caja.service';
import { NegocioService } from 'src/app/services/negocio.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.sass']
})

export class BarChartComponent {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins: any = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Mayores ganancias' }
  ];

  operacionesCaja : OperacionCaja[]=[];
  productos:string[]=[];
  ganancias:number[]=[];


  constructor(private cajaService:CajaService, private snackBar: MatSnackBar, negocioService:NegocioService) {
    if (negocioService.getStoredNegocioId()){
      this.cajaService.getIncrementosCaja()
      .subscribe({
        next : (res: any[])=>{
          var gv:any[]=  [];
          this.operacionesCaja = res;

          var groubedByProducto = this.groupBy(this.operacionesCaja, 'producto');

          Object.keys(groubedByProducto).forEach(function(key) {
            var value = groubedByProducto[key];
            value.forEach(element => {
              var importe=element.cantidad*element.importe;
              var value={importe,key}
              gv.push(value);
            });
          });

          for (let index = 0; index < gv.length; index++) {
            var element = gv[index];
            if (!this.productos.includes(element.key)) {
              this.productos.push(element.key);
              this.ganancias.push(element.importe);
            }
            else{
              this.ganancias[this.positionInArray(element.key)]+= +element.importe;
            }
          }
          //this.ganancias.push(0);
          this.barChartData=[{ data: this.ganancias, label: 'Mayores ventas' },];
          this.barChartLabels=this.productos;

        },
        error:(err)=>{
          alert("Error! " + JSON.stringify(err));
        }
      })
    }
    else{
      this.snackBar.open("Elige un negocio para continuar", "eCarta", {
        duration: 2000,
      });
    }
  }

  positionInArray(key:string){
    for (let index = 0; index < this.productos.length; index++) {
      const element = this.productos[index];
      if (element==key)
        return index;
    }
    return 0;
  }

  groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

}
