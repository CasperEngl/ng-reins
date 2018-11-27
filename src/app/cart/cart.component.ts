import { Component, OnInit } from '@angular/core';

import { WordpressService } from '../wordpress.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: any;
  cartTotals: any;

  constructor(private wp: WordpressService) { }

  ngOnInit() {
    this.wp.cart.subscribe(response => this.cart = response)
    this.wp.cartTotals.subscribe(response => this.cartTotals = response);
  }
}
