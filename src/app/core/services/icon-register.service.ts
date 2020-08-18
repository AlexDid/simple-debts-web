import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { Icons } from '../models';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class IconRegisterService {

  private readonly iconsPath = '/assets/icons';

  constructor(
    private register: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {}

  registerIcons(): void {
    const icons = Object.values(Icons);
    icons.forEach(icon => this.registerIcon(icon));
  }

  private registerIcon(icon: string): void {
    const url = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.iconsPath}/${icon}.svg`);
    this.register.addSvgIcon(icon, url);
  }

}
