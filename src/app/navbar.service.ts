import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  public visible = true;

  constructor() { }

  public toggle() {
    this.visible = !this.visible;
  }

  public hide() {
    this.visible = false;
  }

  public show() {
    this.visible = true;
  }
}
