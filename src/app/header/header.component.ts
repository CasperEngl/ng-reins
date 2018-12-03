import { Component, OnInit } from '@angular/core';

import { NavbarService } from '../services/navbar.service';
import { PageTransitionService } from '../services/page-transition.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public navbar: NavbarService, public pageTransition: PageTransitionService) {}

  ngOnInit() {}
}
