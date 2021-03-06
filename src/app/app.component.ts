import { Component, OnInit } from '@angular/core';

import { WordpressService } from './services/wordpress.service';
import { PageTransitionService } from './services/page-transition.service';
import { PageTransition } from './animations/animations';
import { NavbarService } from './services/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    PageTransition({
      easing: '350ms ease-in-out',
      start: {
        display: 'block',
        opacity: '1',
      },
      end: {
        display: 'none',
        opacity: '0',
      },
    }),
  ],
})
export class AppComponent implements OnInit {
  public lottieConfig: Object;

  constructor(
    private wp: WordpressService,
    public pageTransition: PageTransitionService,
    public navbar: NavbarService,
  ) {}

  ngOnInit() {
    this.wp.getProducts();
    this.wp.getCart();
  }
}
