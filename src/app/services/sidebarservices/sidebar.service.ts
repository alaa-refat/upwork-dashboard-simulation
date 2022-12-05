import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  visible: boolean;

  constructor() {
    this.visible = true;
  }

  hide() {
    this.visible = true;
  }

  show() {
    this.visible = true;
  }

  toggle() {
    this.visible = !this.visible;
  }
}
