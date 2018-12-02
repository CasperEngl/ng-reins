import { Component, OnInit } from '@angular/core';
import { PageTransitionService } from '../page-transition.service';
import { NavbarService } from '../navbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public pageTransition: PageTransitionService, public navbar: NavbarService) {}

  ngOnInit() {}
}
