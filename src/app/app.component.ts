import { Component, OnInit, AfterViewInit } from '@angular/core';

import { WordpressService } from './wordpress.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  public lottieConfig: Object;
  private transition: any;
  private animationSpeed: number = .5;

  constructor(private wp: WordpressService) {
    this.lottieConfig = {
      path: '/wp-content/uploads/page2.json',
      renderer: 'svg',
      autoplay: false,
      loop: false,
      rendererSettings: {
        progressiveLoad: true,
        hideOnTransparent: true,
        className: 'page-transition',
      },
    };
  }

  ngOnInit() {
    this.wp.getProducts();
    this.wp.getCart();
  }

  ngAfterViewInit() {
    this.play();
  }

  handleAnimation(anim: any) {
    this.transition = anim;
    this.transition.setSpeed(this.animationSpeed)
  }

  stop() {
    this.transition.stop();
  }

  play() {
    this.transition.play();
  }

  pause() {
    this.transition.pause();
  }

  setSpeed(speed: number) {
    this.animationSpeed = speed;
    this.transition.setSpeed(speed);
  }
  
}
