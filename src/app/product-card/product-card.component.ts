import { Component, Input, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';

import { WordpressService, ProductData } from '../wordpress.service';
import { PageTransitionService } from '../page-transition.service';
import { addProduct } from '../animations';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  animations: [
    addProduct,
  ],
})
export class ProductCardComponent implements OnInit {
  @Input() product: any;
  
  animate = false;
  animationDuration = 2000;

  timer: Observable<number>;

  constructor(private wp: WordpressService, private pageTransition: PageTransitionService) { }

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
