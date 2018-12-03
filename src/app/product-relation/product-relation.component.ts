import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { WordpressService } from '../services/wordpress.service';
import { PageTransitionService } from '../services/page-transition.service';

@Component({
  selector: 'app-product-relation',
  templateUrl: './product-relation.component.html',
  styleUrls: ['./product-relation.component.scss']
})
export class ProductRelationComponent implements OnInit, OnDestroy {
  product$: Observable<any>;

  @Input() id: number;

  private productSubscription: any;

  constructor(
    private wp: WordpressService,
    public pageTransition: PageTransitionService
  ) {}

  ngOnInit() {
    this.productSubscription = this.wp.products.subscribe(
      response =>
        (this.product$ = response.find(product => product.id === this.id))
    );
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }
}
