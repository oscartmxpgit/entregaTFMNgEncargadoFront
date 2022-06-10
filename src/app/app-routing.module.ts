import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatsComponent } from './modules/statistics/components/panel/stats.component';
import { BarChartComponent } from './modules/statistics/components/stats-charts/bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './modules/statistics/components/stats-charts/doughnut-chart/doughnut-chart.component';
import { LineChartComponent } from './modules/statistics/components/stats-charts/line-chart/line-chart.component';
import { RadarChartComponent } from './modules/statistics/components/stats-charts/radar-chart/radar-chart.component';
import { NegociosComponent } from './modules/pages/negocios/negocios.component';
import { EmpleadosComponent } from './modules/pages/empleados/empleados.component';
import { MesasComponent } from './modules/pages/mesas/mesas.component';
import { InventariosComponent } from './modules/pages/inventarios/inventarios.component';
import { CajasComponent } from './modules/pages/cajas/cajas.component';
import { LoginComponent } from './modules/usuarios/login/login.component';
import { RegisterComponent } from './modules/usuarios/register/register.component';
import { UsuarioComponent } from './modules/usuarios/usuario/usuario.component';
import { PlatosComponent } from './modules/pages/platos/platos.component';
import { AuthGuard } from './modules/usuarios/shared/auth.guard';
import { HomeComponent } from './modules/pages/home/home.component';
import { AcercadeComponent } from './modules/pages/acercade/acercade.component';
import { InsumosComponent } from './modules/pages/insumos/insumos.component';
import { EvaluacionEmpleadoComponent } from './modules/pages/evaluacion-empleado/evaluacion-empleado.component';
const routes: Routes = [
{path:'',redirectTo: 'home', pathMatch: 'full'},
{path:'estadisticas',component:StatsComponent},
{
  path: 'estadisticas', component: StatsComponent, canActivate: [AuthGuard],
  children: [
    {path:'line-chart',component:LineChartComponent, canActivate: [AuthGuard]},
    {path:'bar-chart',component:BarChartComponent, canActivate: [AuthGuard]},
    {path:'doughnut-chart',component:DoughnutChartComponent, canActivate: [AuthGuard]},
    {path:'radar-chart',component:RadarChartComponent, canActivate: [AuthGuard]},
  ]
},

{path:'negocios',component:NegociosComponent, canActivate: [AuthGuard] },
{path:'empleados',component:EmpleadosComponent, canActivate: [AuthGuard] },
{path:'mesas',component:MesasComponent, canActivate: [AuthGuard] },
{path:'cajas',component:CajasComponent, canActivate: [AuthGuard] },
{path:'inventarios',component:InventariosComponent, canActivate: [AuthGuard] },
{path:'platos',component:PlatosComponent, canActivate: [AuthGuard] },
{path: 'login',component:LoginComponent, canActivate: [AuthGuard] },
{path: 'register',component:RegisterComponent},
{path: 'usuario',component:UsuarioComponent, canActivate: [AuthGuard]},
{path: 'home',component:HomeComponent},
{path: 'insumos',component:InsumosComponent, canActivate: [AuthGuard]},
{path: 'evalEmp',component:EvaluacionEmpleadoComponent, canActivate: [AuthGuard]},
{path: 'acercade',component:AcercadeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
