import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CajaService } from 'src/app/services/caja.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.sass']
})
export class StatsComponent implements OnInit {
  operacionesCaja: any[] = [];

  constructor(private cajaService: CajaService, private snackBar: MatSnackBar) {
    if (localStorage.getItem('ecarta_idNegocio') != null) {
      this.cajaService.getCajas().subscribe(
        (data) => {
          this.operacionesCaja = data;
        }
      )
    }
    else
      this.snackBar.open("Bienvenido. Elige un negocio para continuar", "Ok", {
        duration: 2000,
      });
  }

  ngOnInit(): void {
  }

}
