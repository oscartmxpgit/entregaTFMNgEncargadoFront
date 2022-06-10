import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { CajaService } from 'src/app/services/caja.service';
import { NegocioService } from 'src/app/services/negocio.service';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.sass']
})

export class DoughnutChartComponent {

  doughnutChartLabels: Label[] = ['Ingresos', 'Gastos'];
  doughnutChartData: MultiDataSet = [
    [0, 0]
  ];
  doughnutChartType: ChartType = 'doughnut';

  constructor(private cajaService:CajaService, private snackBar: MatSnackBar, negocioService:NegocioService) {
    if (negocioService.getStoredNegocioId()){
      var endDate=new Date();
      var startDate=new Date();
      startDate.setDate(startDate.getDate() -90);

      this.cajaService.getTotalcaja()
      .subscribe({
        next : (res: any)=>{
          this.doughnutChartData=[res.incremento,res.decremento]
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
}
