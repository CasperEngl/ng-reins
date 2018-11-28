import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

import { WordpressService } from './wordpress.service';
import { PageTransitionService } from './page-transition.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('pageTransition', [
      state('start', style({
        opacity: '1',
        display: 'block',
      })),
      state('end', style({
        opacity: '0',
        display: 'none',
      })),
      transition('start => end', [
        animate('350ms ease')
      ]),
      transition('end => start', [
        animate('350ms ease')
      ]),
    ]),
  ]
})
export class AppComponent implements OnInit {

  public lottieConfig: Object;

  constructor(private wp: WordpressService, private pageTransition: PageTransitionService) { }

  ngOnInit() {
    this.wp.getProducts();
    this.wp.getCart();
  }
  
}
