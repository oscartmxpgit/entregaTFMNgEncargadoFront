import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { delay, filter } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { UntilDestroy, untilDestroyed  } from '@ngneat/until-destroy';
import { AuthService } from './modules/usuarios/services/auth.service';
import { Negocio } from './shared/models/negocio';
import { NegocioService } from './services/negocio.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
import { ThemeService } from './services/theme.service';
import { animate, state, style, transition, trigger } from '@angular/animations';


export interface MenuItem {
  label: string;
  icon: string;
  link: string;
  showOnMobile: boolean;
  showOnTablet: boolean;
  showOnDesktop: boolean;
}
export interface SideMenuItem {
  label: string;
  icon: string;
  link: string;
}

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  title = 'EncargadoFront';
  negocioElegido=false;
  negocios:Negocio[];
  menuItems: MenuItem[] = [
    {
      label: '',
      icon: 'bar_chart',
      link: 'estadisticas',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true
    },
    {
      label: 'Navbar.about',
      icon: 'info',
      link: 'acercade',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: false
    }
  ];
  sideNavItems: SideMenuItem[] = [

    {
      label: 'Sidenav.employees',
      icon: 'people_outline',
      link: 'empleados'
    },
    {
      label: 'Sidenav.tables',
      icon: 'table_chart_outline',
      link: 'mesas'
    },
    {
      label: 'Sidenav.dishes',
      icon: 'fastfood',
      link: 'platos'
    },
    {
      label: 'Sidenav.cash',
      icon: 'attach_money_outline',
      link: 'cajas'
    },
    {
      label: 'Sidenav.input',
      icon: 'notes_outline',
      link: 'insumos'
    },

  ];

  topMenuItems: any[];

  negocio:Negocio;

  isDark$ = this.themeService.isDark$;


  constructor(public auth: AuthService, private negocioService: NegocioService, private router: Router,private snackBar: MatSnackBar,
    public neg : NegocioService, private observer: BreakpointObserver, private themeService: ThemeService,
    private translateService: TranslateService) {
      // idiomas utilizados
      const langs = ['es', 'en'];
      const browserLang = translateService.getBrowserLang();
      translateService.addLangs(langs);
      // configurar el lenguaje por defecto - si no hay ninguno utilizado
      translateService.setDefaultLang('es');
      // configurar el idioma de acuerdo con el configurado en el navegador
      if (langs.indexOf(browserLang) > -1) {
        translateService.use(browserLang);
      }
      this.getNegociosPorEncargado();
     }

   changeLanguage(language: string): void {
      this.translateService.use(language).subscribe(() => {
      });


  }

  getNegociosPorEncargado(){
    if (this.auth.getIdEncargado()!=null){
      this.neg.getNegociosPorEncargadoId()
      .subscribe({
        next :(res)=>{
          this.negocios = res;
        },
        error:(err) =>{
          this.router.navigate(['login']);
        }
      })
    }
  }

  getNegocioPorId(){
    if (this.auth.getIdEncargado()!=null && this.negocioService.getNegocioPorId()!=null){
      this.neg.getNegocioPorId()
      .subscribe({
        next :(res)=>{
          this.negocio=res;
        },
        error:(err) =>{
          if (this.auth.isAuthenticated())
            this.snackBar.open("Bienvenido eCarta", "Elige un negocio para continuar", {
              duration: 2000,
            });
          else{
            console.log(err);
          }
        }
      })
    }
  }

  logout() {
    this.auth.logout();

    this.router.navigate(['login'])
      .then(() => {
        let currentUrl = this.router.url;
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([currentUrl]);
          });
      });
  }

  cambiaNegocio(idNegocio: number){
    this.neg.storeNegocioId(idNegocio);
    this.negocioElegido=true;
    this.getNegocioPorId();
    //window.location.reload();
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
     });
  }

  ngOnInit(): void {
    this.getNegociosPorEncargado();
    this.getNegocioPorId();
    this.themeService.setTheme();
  }

  goHome(){
    this.router.navigateByUrl('');

  }
//

ngAfterViewInit() {
  this.observer
    .observe(['(max-width: 800px)'])
    .pipe(delay(1), untilDestroyed(this))
    .subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
  });

  this.router.events
    .pipe(
      untilDestroyed(this),
      filter((e) => e instanceof NavigationEnd)
    )
    .subscribe(() => {
      if (this.sidenav.mode === 'over') {
        this.sidenav.close();
      }
    });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    window.location.reload();
  }
}
