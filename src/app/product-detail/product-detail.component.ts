import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { WordpressService } from '../wordpress.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product$: Observable<any>;
  
  id: number;
  private sub: any;

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
}
