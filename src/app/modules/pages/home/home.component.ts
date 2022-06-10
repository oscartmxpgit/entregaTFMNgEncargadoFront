import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NegocioService } from 'src/app/services/negocio.service';
import { Negocio } from 'src/app/shared/models/negocio';
import { AuthService } from '../../usuarios/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(public auth: AuthService,private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }


}
