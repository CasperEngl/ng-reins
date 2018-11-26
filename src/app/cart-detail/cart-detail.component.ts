import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { throttleTime, distinctUntilChanged } from 'rxjs/operators';

import { WordpressService } from '../wordpress.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss']
})
export class CartDetailComponent implements OnInit {
  cart$: Observable<any>;
  cartTotals$: Observable<any>;

  quantity: number;
  quantityChangeSubscriber: Subscriber<any>;
  private cart: any;

  constructor(private wp: WordpressService) { }

  ngOnInit() {
    this.updateCart();
    this.cart = this.wp.getCart().subscribe({
      next: response => {
        this.cart$ = response

        console.log(this.cart$)
      },
      error: error => console.error(error),
    });
  }

  ngOnDestroy() {
    this.cart.unsubscribe();
  }

  updateCart() {
    this.wp.getCartTotals().subscribe({
      next: response => this.cartTotals$ = response,
      error: error => console.error(error),
    })
  }

  changeQuantity(event: KeyboardEvent, cart_item_key: string) {
    const target = event.target as HTMLInputElement;

    if (!this.quantityChangeSubscriber) {
      Observable.create(observer => {
        this.quantityChangeSubscriber = observer;
      }).pipe(
        throttleTime(500),
        distinctUntilChanged()
      )
        .subscribe(value => {
          this.quantity = value;

          this.wp.updateInCart({
            cart_item_key: cart_item_key,
            quantity: this.quantity
          }).subscribe(() => this.updateCart());
        });
    }

    this.quantityChangeSubscriber.next(Number(target.value));
  }

  removeItem(key: string) {
    this.wp.deleteFromCart(key).subscribe();
  }

}
