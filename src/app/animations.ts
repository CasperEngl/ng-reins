import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export function PageTransition() {
  return trigger('pageTransition', [
    state('start', style({
      opacity: '1',
      display: 'block',
    })),
    state('end', style({
      opacity: '0',
      display: 'none',
    })),
    transition('start => end', [
      animate('350ms ease')
    ]),
    transition('end => start', [
      animate('350ms ease')
    ]),
  ]);
}

export const addProduct = trigger('addProduct', [
  state('start', style({
    backgroundColor: '#28a745',
    borderColor: '#28a745',
  })),
  state('end', style({
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  })),
  transition('start => end', [
    animate('350ms ease')
  ]),
  transition('end => start', [
    animate('350ms ease')
  ]),
]);