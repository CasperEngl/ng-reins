import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { WordpressService } from '../wordpress.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products$: Observable<any[]>;

  constructor(private wp: WordpressService) { }

  ngOnInit() {
    this.products$ = this.wp.getProducts();
  }
}
