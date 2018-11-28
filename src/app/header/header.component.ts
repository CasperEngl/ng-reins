import { Component, OnInit } from '@angular/core';
import { PageTransitionService } from '../page-transition.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  navbarCollapsed = true;

  constructor(private pageTransition: PageTransitionService) { }

  ngOnInit() {
  }

  menuToggle() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

}
