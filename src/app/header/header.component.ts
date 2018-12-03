import { Component, OnInit } from '@angular/core';

import { NavbarService } from '../navbar.service';
import { PageTransitionService } from '../page-transition.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public navbar: NavbarService, public pageTransition: PageTransitionService) {}

  ngOnInit() {}
}
