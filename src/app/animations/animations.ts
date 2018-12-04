import {
  trigger,
  state,
  style,
  transition,
  animate,
  query,
  animateChild,
  AnimationTriggerMetadata,
} from '@angular/animations';

import {
  IAddProduct,
  INavBackground,
  INavbar,
  IPageTransition,
  IFadeOut,
} from './animations.d';

export function PageTransition(
  options: IPageTransition,
): AnimationTriggerMetadata {
  return trigger('pageTransition', [
    state(
      'start',
      style({
        ...options.start,
      }),
    ),
    state(
      'end',
      style({
        ...options.end,
      }),
    ),
    transition('* => *', [animate(options.easing)]),
  ]);
}

export function Navbar(options: INavbar): AnimationTriggerMetadata {
  return trigger('navbar', [
    state(
      'start',
      style({
        ...options.start,
      }),
    ),
    state(
      'end',
      style({
        ...options.end,
      }),
    ),
    transition('* => *', [animate(options.easing)]),
  ]);
}

export function NavBackground(
  options: INavBackground,
): AnimationTriggerMetadata {
  return trigger('navBackground', [
    state(
      'start',
      style({
        ...options.start,
      }),
    ),
    state(
      'end',
      style({
        ...options.end,
      }),
    ),
    transition('start => end', [animate(options.easing)]),
    transition('end => start', [
      animate(options.easing),
      query('@navbar', [animateChild()]),
    ]),
  ]);
}

export function AddProduct(options: IAddProduct): AnimationTriggerMetadata {
  return trigger('addProduct', [
    state(
      'start',
      style({
        backgroundColor: options.start.backgroundColor,
        borderColor: options.start.borderColor,
      }),
    ),
    state(
      'end',
      style({
        backgroundColor: options.end.backgroundColor,
        borderColor: options.end.borderColor,
      }),
    ),
    transition('* => *', [animate(options.easing)]),
  ]);
}

export function FadeOut(options: IFadeOut): AnimationTriggerMetadata {
  return trigger('fadeOut', [
    state(
      'start',
      style({
        opacity: '1',
      }),
    ),
    state(
      'end',
      style({
        opacity: '0',
      }),
    ),
    transition('start => end', [animate(options.easing)]),
  ]);
}
