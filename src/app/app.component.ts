import { Component, OnInit } from '@angular/core';

import { WordpressService } from './wordpress.service';
import { PageTransitionService } from './page-transition.service';
import { PageTransition } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    PageTransition(),
  ]
})
export class AppComponent implements OnInit {

  public lottieConfig: Object;

  constructor(private wp: WordpressService, public pageTransition: PageTransitionService) { }

  ngOnInit() {
    this.wp.getProducts();
    this.wp.getCart();
  }
  
}
