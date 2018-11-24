import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { WordpressService } from '../wordpress.service';

@Component({
  selector: 'app-product-relation',
  templateUrl: './product-relation.component.html',
  styleUrls: ['./product-relation.component.scss']
})
export class ProductRelationComponent implements OnInit, OnDestroy {
  product$: Observable<any>;
  
  @Input() id: number;

  private sub: any;

  constructor(private wp: WordpressService) { }

  ngOnInit() {
    this.sub = this.wp.getProduct(this.id).subscribe({
      next: response => this.product$ = response,
      error: error => console.error(error),
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
