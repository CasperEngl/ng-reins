import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";

import { WordpressService, ProductData } from "../wordpress.service";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"]
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product$: Observable<any>;

  id: number;
  quantity: number;
  private productSubscription: any;

  constructor(private wp: WordpressService, private route: ActivatedRoute) {}

  ngOnInit() {
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
