import { Component, OnInit } from '@angular/core';

import { WordpressService } from '../wordpress.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: any[];

  constructor(private wp: WordpressService) { }

  ngOnInit() {
    this.wp.products.subscribe(response => this.products = response);
  }
}
