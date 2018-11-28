import { Injectable} from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class TransitionDelayResolve implements Resolve<Observable<any>> {

  constructor() { }

  resolve(): Observable<any> {
    return of('delayed navigation').pipe(
      delay(750)
    );
  }
}