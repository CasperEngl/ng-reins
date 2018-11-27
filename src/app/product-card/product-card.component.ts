import { Component, Input, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Observable, timer } from 'rxjs';

import { WordpressService, ProductData } from '../wordpress.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  animations: [
    trigger('addedProduct', [
      state('added', style({
        backgroundColor: '#28a745',
        borderColor: '#28a745',
      })),
      state('reset', style({
        backgroundColor: '#007bff',
        borderColor: '#007bff',
      })),
      transition('added => reset', [
        animate('.35s')
      ]),
      transition('reset => added', [
        animate('.35s')
      ]),
    ]),
  ],
})
export class ProductCardComponent implements OnInit {
  @Input() product: any;
  
  animate = false;
  animationDuration = 2000;

  timer: Observable<number>;

  constructor(private wp: WordpressService) { }

  ngOnInit() {
    this.timer = timer(this.animationDuration);
  }

  addToCart({ product_id }: ProductData) {
    this.animate = !this.animate;
    this.timer.subscribe(() => this.animate = !this.animate);

    this.wp.addToCart({
      product_id,
      quantity: 1,
    });
  }

}
