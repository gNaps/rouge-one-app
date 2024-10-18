import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  currentTheme: 'dark' | 'light' = 'dark';
  constructor(@Inject(DOCUMENT) private document: Document) {}

  switchTheme(theme: 'dark' | 'light') {
    let themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = theme + '-theme.css';
    }

    this.currentTheme = theme;
  }
}
