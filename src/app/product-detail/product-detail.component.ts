import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, timer } from "rxjs";

import { WordpressService, ProductData } from "../wordpress.service";
import { addProduct } from "../animations";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
  animations: [
    addProduct
  ],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product$: Observable<any>;

  id: number;
  quantity: number;
  private productSubscription: any;

  animate = false;
  animationDuration = 2000;

  timer: Observable<number>;

  constructor(private wp: WordpressService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.timer = timer(this.animationDuration);

    this.route.params.subscribe(params => {
      this.productSubscription = this.wp.products.subscribe(
        response => this.product$ = response.find(product => product.id === Number(params['id']))
      );
    });
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }

  addToCart({ product_id }: ProductData) {
    this.animate = !this.animate;
    this.timer.subscribe(() => this.animate = !this.animate);

    this.wp.addToCart({
      product_id,
      quantity: this.quantity
    });
  }

  changeQuantity(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;

    this.quantity = Number(target.value);
  }
}
