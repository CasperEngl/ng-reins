import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { WordpressService } from './wordpress.service';

@Injectable({
  providedIn: 'root'
})
export class PageTransitionService {

  public lottieConfig: Object;
  transition: any;
  animationSpeed: number = 0.25;
  running: boolean = false;

  constructor(private wp: WordpressService) {
    this.lottieConfig = {
      path: '/wp-content/uploads/page60.json',
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
    console.log(anim);
    this.transition = anim;
    this.transition.setSpeed(this.animationSpeed)
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
