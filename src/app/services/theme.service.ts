import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs-compat';
import { THEMES } from '../shared/config/theme.config';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  public isDark$ = new BehaviorSubject(
    localStorage.getItem('ecarta_theme') === 'dark'
  );

  setTheme() {

    if (localStorage.getItem('ecarta_theme')==='dark'){
      var theme = THEMES['dark'];
    }
    else{
      var theme = THEMES['default'];
    }
    Object.keys(theme).forEach((key) => {
      this.document.documentElement.style.setProperty(`--${key}`, theme[key]);
    });
  }
  toggleTheme() {

    if (localStorage.getItem('ecarta_theme')==='dark'){
      var theme = THEMES['dark'];
      localStorage.setItem('ecarta_theme', 'default');
    }
    else{
      var theme = THEMES['default'];
      localStorage.setItem('ecarta_theme', 'dark');
    }

    this.isDark$.next(!this.isDark$.getValue());
   // var theme = THEMES['spotify'];
    Object.keys(theme).forEach((key) => {
      this.document.documentElement.style.setProperty(`--${key}`, theme[key]);
    });
  }
}
