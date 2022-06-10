import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { StatsComponent } from './components/panel/stats.component';
import { BarChartComponent } from './components/stats-charts/bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './components/stats-charts/doughnut-chart/doughnut-chart.component';
import { LineChartComponent } from './components/stats-charts/line-chart/line-chart.component';
import { RadarChartComponent } from './components/stats-charts/radar-chart/radar-chart.component';



@NgModule({
  declarations: [StatsComponent,
    BarChartComponent,
    DoughnutChartComponent,
    LineChartComponent,
    RadarChartComponent,
   ],
  imports: [
    CommonModule,
    ChartsModule,
    AppRoutingModule,
  ]
})
export class StatisticsModule { }
