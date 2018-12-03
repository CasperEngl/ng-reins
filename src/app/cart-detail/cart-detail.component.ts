import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { throttleTime, distinctUntilChanged } from 'rxjs/operators';

import { WordpressService } from '../services/wordpress.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss']
})
export class CartDetailComponent implements OnInit {
  @Input() product: any;
  price: number;
  quantity: number;
  quantityChangeSubscriber: Subscriber<any>;

  constructor(private wp: WordpressService) {}

  ngOnInit() {
    this.wp.products.subscribe(products => {
      const product = products.find(
        product => product.id === this.product.product_id
      );

      this.price = product ? product.price : null;
    });
  }

  changeQuantity(event: KeyboardEvent, cart_item_key: string) {
    const target = event.target as HTMLInputElement;

    if (!this.quantityChangeSubscriber) {
      Observable.create(observer => {
        this.quantityChangeSubscriber = observer;
      })
        .pipe(
          throttleTime(500),
          distinctUntilChanged()
        )
        .subscribe(value => {
          this.quantity = value;

          this.wp.updateInCart({
            cart_item_key: cart_item_key,
            quantity: this.quantity
          });
        });
    }

    this.quantityChangeSubscriber.next(Number(target.value));
  }

  removeItem(key: string) {
    this.wp.deleteFromCart(key).subscribe();
  }
}
