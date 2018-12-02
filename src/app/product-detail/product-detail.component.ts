import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, timer, combineLatest } from 'rxjs';

import { WordpressService, ProductData } from '../wordpress.service';
import { addProduct } from '../animations';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  animations: [addProduct]
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product$: Observable<any>;

  id: number;
  quantity: number;
  private productSubscription: any;

  animate = false;
  animationDuration = 2000;

  timer: Observable<number>;

  constructor(private wp: WordpressService, private route: ActivatedRoute, private titleService: Title) {}

  ngOnInit() {
    this.timer = timer(this.animationDuration);

    // Combine route params and wp products Observables
    // Then find the product where the ID matches the route param ID
    this.productSubscription = combineLatest(this.route.params, this.wp.products, (params, products) =>
      products.find(product => product.id === Number(params.id))
    ).subscribe(response => {
      this.product$ = response;

      if (response)
        this.titleService.setTitle(`${response.name} - Reins`)
    });
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
    this.titleService.setTitle('Reins')
  }

  addToCart({ product_id }: ProductData) {
    this.animate = !this.animate;
    this.timer.subscribe(() => (this.animate = !this.animate));

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
