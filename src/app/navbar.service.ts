import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  public visible = true;

  constructor() { }

  toggle() {
    this.visible = !this.visible;
  }

  hide() {
    this.visible = false;
  }

  show() {
    this.visible = true;
  }
}
