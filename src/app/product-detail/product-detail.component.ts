import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { WordpressService, ProductData } from '../wordpress.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product$: Observable<any>;
  
  id: number;
  quantity: number;
  private sub: any;
  private cart: any;
  private addedCart: any;
  private clearedCart: any;

  constructor(private wp: WordpressService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = Number(params['id']);

      this.sub = this.wp.getProduct(this.id).subscribe({
        next: response => this.product$ = response,
        error: error => console.error(error),
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  addToCart({ product_id }: ProductData) {
    this.addedCart = this.wp.addToCart({
      product_id,
      quantity: this.quantity,
    }).subscribe();
  }

  getCart() {
    this.cart = this.wp.getCart().subscribe(response => console.log('your cart', response));
  }

  clearCart() {
    this.clearedCart = this.wp.clearCart().subscribe();
  }

  changeQuantity(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;

    this.quantity = Number(target.value);
  }
}
