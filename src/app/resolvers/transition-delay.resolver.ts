import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class TransitionDelayResolve implements Resolve<Observable<boolean>> {
  constructor() {}

  resolve(): Observable<boolean> {
    return of(true).pipe(delay(500));
  }
}
