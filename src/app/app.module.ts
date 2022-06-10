import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';


import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { NegociosComponent } from './modules/pages/negocios/negocios.component';
import { MesasComponent } from './modules/pages/mesas/mesas.component';
import { InventariosComponent } from './modules/pages/inventarios/inventarios.component';
import { DialogNegocioComponent } from './modules/pages/negocio-dialog/dialog-negocio.component';
import { MesadialogComponent } from './modules/pages/mesa-dialog/mesadialog.component';
import { CajasComponent } from './modules/pages/cajas/cajas.component';
import { LoginComponent } from './modules/usuarios/login/login.component';
import { RegisterComponent } from './modules/usuarios/register/register.component';
import { UsuarioComponent } from './modules/usuarios/usuario/usuario.component';
import { EmpleadosComponent } from './modules/pages/empleados/empleados.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from './modules/usuarios/services/auth.service';
import { AuthGuard } from './modules/usuarios/shared/auth.guard';
import { TokenInterceptor } from './modules/usuarios/shared/token.interceptor';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ToastrModule } from 'ngx-toastr';
import { PlatosComponent } from './modules/pages/platos/platos.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { MatTooltipModule } from '@angular/material/tooltip';
import { UsuarioDialogComponent } from './modules/usuarios/usuario-dialog/usuario-dialog.component';
import { HomeComponent } from './modules/pages/home/home.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from './app.translate.factory';
import { EmpleadoDialogComponent } from './modules/pages/empleado-dialog/empleado-dialog.component';
import { AcercadeComponent } from './modules/pages/acercade/acercade.component';
import { PlatoDialogComponent } from './modules/pages/plato-dialog/plato-dialog.component';
import { CajaDialogComponent } from './modules/pages/caja-dialog/caja-dialog.component';
import localeEs from "@angular/common/locales/es";
import { registerLocaleData } from "@angular/common";
import { InsumosComponent } from './modules/pages/insumos/insumos.component';
import { InsumosDialogComponent } from './modules/pages/insumos-dialog/insumos-dialog.component';
import { EvaluacionEmpleadoComponent } from './modules/pages/evaluacion-empleado/evaluacion-empleado.component';
import { EvaluacionEmpleadoDialogComponent } from './modules/pages/evaluacion-empleado-dialog/evaluacion-empleado-dialog.component';
registerLocaleData(localeEs, "es");

@NgModule({
  declarations: [
    AppComponent,
    EmpleadosComponent,
    NegociosComponent,
    MesasComponent,
    CajasComponent,
    InventariosComponent,
    DialogNegocioComponent,
    MesadialogComponent,
    LoginComponent,
    RegisterComponent,
    UsuarioComponent,
    PlatosComponent,
    PlatoDialogComponent,
    UsuarioDialogComponent,
    HomeComponent,
    EmpleadoDialogComponent,
    AcercadeComponent,
    CajaDialogComponent,
    InsumosComponent,
    InsumosDialogComponent,
    EvaluacionEmpleadoComponent,
    EvaluacionEmpleadoDialogComponent
  ],
  imports: [
    MatTooltipModule,
    MatButtonToggleModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatSnackBarModule,
    FlexLayoutModule,
    MatDividerModule,
    MatSidenavModule,
    MatMenuModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule,
    HttpClientModule,
    MatTableModule,
    MatCardModule,
    //MatTableDataSource,
    MatPaginatorModule,
    MatSortModule,
    StatisticsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ImageCropperModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AuthService,
    { provide: LOCALE_ID, useValue: "es" },
    MatPaginatorIntl,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
