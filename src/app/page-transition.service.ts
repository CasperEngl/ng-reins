import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { WordpressService } from './wordpress.service';
import { NavbarService } from './navbar.service';

@Injectable({
  providedIn: 'root',
})
export class PageTransitionService {
  public lottieConfig: Object;
  transition: any;
  animationSpeed: number = 1;
  running: boolean = false;

  constructor(private wp: WordpressService, private navbar: NavbarService) {
    this.lottieConfig = {
      // path: '/wp-content/uploads/page.json',
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

  handleAnimation(anim: any) {
    this.transition = anim;
    this.transition.setSpeed(this.animationSpeed);

    this.transition.addEventListener('complete', () => (this.running = false));
  }

  stop(): Observable<boolean> {
    const subject = new Subject<boolean>();

    this.transition.stop();
    this.running = false;

    subject.next(this.running);

    return subject.asObservable();
  }

  play(): Observable<boolean> {
    const subject = new Subject<boolean>();
    
    this.navbar.hide();
    this.transition.goToAndPlay(0);
    this.running = true;

    subject.next(this.running);

    return subject.asObservable();
  }

  pause() {
    const subject = new Subject<boolean>();

    this.transition.pause();

    subject.next(true);

    return subject.asObservable();
  }

  setSpeed(speed: number) {
    this.animationSpeed = speed;
    this.transition.setSpeed(speed);
  }
}
