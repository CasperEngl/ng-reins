import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { WordpressService } from '../wordpress.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products$: Observable<any[]>;
  query: string;

  constructor(private wp: WordpressService, private titleService: Title) { }

  ngOnInit() {
    this.products$ = this.wp.products;
    this.titleService.setTitle('Products - Reins');
  }

  ngOnDestroy() {
    this.titleService.setTitle('Reins');
  }
}
