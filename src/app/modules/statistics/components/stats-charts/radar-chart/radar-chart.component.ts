import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { EvalEmpService } from 'src/app/services/eval-emp.service';
import { NegocioService } from 'src/app/services/negocio.service';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.sass']
})

export class RadarChartComponent {

  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['Puntualidad', 'Communicación', 'Resolución de problemas',
    'Colaboración con el equipo', 'Trabajo diario', 'Conocimientos', 'Cumple tareas'];

  public radarChartData: ChartDataSets[] = [
    { data: [], label: 'Análisis de destrezas de empleados' }
  ];
  public radarChartType: ChartType = 'radar';

  evaluacionEmpleados: any[]=[];
  criterios:string[]=[];
  evaluaciones: number[]=[];

  constructor(private evalEmpService:EvalEmpService, private snackBar: MatSnackBar,negocioService:NegocioService) {
    if (negocioService.getStoredNegocioId()){
      this.evalEmpService.getEvaluacionEmpleados()
      .subscribe({
        next : (res: any)=>{
          this.evaluacionEmpleados=res;
          var gv:any[]=  [];

          var groubedByCriterio = this.groupBy(this.evaluacionEmpleados, 'criterio');

          Object.keys(groubedByCriterio).forEach(function(key) {
            var value = groubedByCriterio[key];
            value.forEach(element => {
              var evaluacion=element.evaluacion;
              var value={evaluacion,key}
              gv.push(value);
            });
          });

          for (let index = 0; index < gv.length; index++) {
            var element = gv[index];
            if (!this.criterios.includes(element.key)) {
              this.criterios.push(element.key);
              this.evaluaciones.push(element.evaluacion);
            }
            else{
              this.evaluaciones[this.positionInArray(element.key)]+= +element.evaluacion;
            }
          }
          this.radarChartData=[{ data: this.evaluaciones, label: 'Análisis de destrezas de empleados' },];
          this.radarChartLabels=this.criterios;

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
    for (let index = 0; index < this.criterios.length; index++) {
      const element = this.criterios[index];
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
