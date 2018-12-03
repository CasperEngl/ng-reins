import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { PageTransitionService } from '../page-transition.service';
import { NavbarService } from '../navbar.service';
import { WordpressService } from '../wordpress.service';

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
        transform: 'translateY(3rem)',
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
  faTimes = faTimes;

  products$: Observable<any[]>;

  constructor(
    private wp: WordpressService,
    public pageTransition: PageTransitionService,
    public navbar: NavbarService,
  ) {}

  ngOnInit() {
    this.products$ = this.wp.products;
  }
}
