import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { WordpressService } from '../wordpress.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products$: Observable<any[]>;

  constructor(private wp: WordpressService) { }

  ngOnInit() {
    this.products$ = this.wp.products;
  }
}
