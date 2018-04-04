import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { startWith, switchMap } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';

@Injectable()
export class GameTimerService {

  private static interval$: BehaviorSubject<number> = new BehaviorSubject<number>(600);

  public setInterval(newInterval: number) {
      GameTimerService.interval$.next(newInterval);
  }

  public get gameTick$() {
      return GameTimerService.interval$.pipe(
          switchMap((speed: number) => interval(speed).pipe(startWith(0)))
      );
  }
}
