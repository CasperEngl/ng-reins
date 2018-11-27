import { Component, OnInit } from '@angular/core';

import { WordpressService } from './wordpress.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private wp: WordpressService) { }

  ngOnInit() {
    this.wp.getProducts();
    this.wp.getCart();
  }
  
}
