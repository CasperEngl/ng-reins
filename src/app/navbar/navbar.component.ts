import { Component, OnInit } from '@angular/core';

import { NavbarService } from '../navbar.service';
import { Navbar, NavBackground } from '../animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    Navbar({
      easing: '350ms ease-in-out',
      start: {
        transform: 'translate(0)',
        opacity: '1',
      },
      end: {
        transform: 'translate(-1rem, 3rem)',
        opacity: '0',
      },
    }),
    NavBackground({
      easing: '200ms ease-in-out',
      start: {
        display: 'flex',
        opacity: '1',
      },
      end: {
        display: 'none',
        opacity: '0',
      },
    }),
  ],
})
export class NavbarComponent implements OnInit {
  constructor(public navbar: NavbarService) {}

  ngOnInit() {}
}
