import { Component, } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { OperacionCaja } from 'src/app/modules/usuarios/models/OperacionCaja';
import { CajaService } from 'src/app/services/caja.service';
import { NegocioService } from 'src/app/services/negocio.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.sass']
})

export class LineChartComponent {

  operacionesCaja : OperacionCaja[]=[];
  ganancias:number[]=[];

  constructor(private cajaService:CajaService, private snackBar: MatSnackBar, negocioService:NegocioService) {
    if (negocioService.getStoredNegocioId()){
      this.cajaService.getOpCajasValidadas()
      .subscribe({
        next : (res: any[])=>{
          var gv:any[]=  [];
          this.operacionesCaja = res;

          var groubedByProducto = this.groupBy(this.operacionesCaja, 'fechaHora');

          Object.keys(groubedByProducto).forEach(function(key) {
            var value = groubedByProducto[key];
            value.forEach(element => {
              var importe=element.cantidad*element.importe;
              var value={importe,key}
              gv.push(value);
            });
          });

          gv.forEach(element => {
              for (let index = 0; index < 12; index++) {
                var mes=element.key.substring(5, 7);

                if (mes==index+1) {
                  this.ganancias[index-1] += element.importe;
                }

              }
             this.ganancias.push(element.importe);
          });

          this.lineChartData=[{ data: this.ganancias, label: 'Mayores ventas' },];

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

  lineChartData: ChartDataSets[] = [
    { data: this.ganancias, label: 'Ventas de platos' },
  ];

  groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  lineChartLabels: Label[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins: any = [];
  lineChartType: ChartType  = 'line';



  ngOnInit(): void {
  }

}
