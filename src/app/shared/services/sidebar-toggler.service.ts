import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarTogglerService {
  sidebarToggler = signal<boolean>(true);

  updateSidebarToggler() {
    this.sidebarToggler.update((val) => !val);
  }
}
