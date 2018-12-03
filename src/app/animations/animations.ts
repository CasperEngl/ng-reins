import {
  trigger,
  state,
  style,
  transition,
  animate,
  query,
  animateChild,
} from '@angular/animations';

import {
  IAddProduct,
  INavBackground,
  INavbar,
  IPageTransition,
} from './animations.d';

export function PageTransition(options: IPageTransition) {
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
    transition('start => end', [animate(options.easing)]),
    transition('end => start', [animate(options.easing)]),
  ]);
}

export function Navbar(options: INavbar) {
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
    transition('start => end', [animate(options.easing)]),
    transition('end => start', [animate(options.easing)]),
  ]);
}

export function NavBackground(options: INavBackground) {
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

export function AddProduct(options: IAddProduct) {
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
    transition('start => end', [animate(options.easing)]),
    transition('end => start', [animate(options.easing)]),
  ]);
}
