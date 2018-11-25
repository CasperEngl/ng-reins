import { Component, OnInit, OnDestroy } from '@angular/core';
import { WordpressService } from '../wordpress.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss']
})
export class CartDetailComponent implements OnInit, OnDestroy {
  cart$: Observable<any>;

  private cart: any;

  constructor(private wp: WordpressService) { }

  ngOnInit() {
    this.cart = this.wp.getCart().subscribe({
      next: response => this.cart$ = response,
      error: error => console.error(error),
    });
  }

  ngOnDestroy() {
    this.cart.unsubscribe();
  }

}
