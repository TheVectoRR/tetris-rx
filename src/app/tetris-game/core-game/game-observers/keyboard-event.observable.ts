import { TetrisActionName } from '../game-objects/tetris-utils';
import { fromEvent } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';


export let keyboardObservable$: Observable<TetrisActionName> = fromEvent(document, 'keydown')
  .pipe(
    map((e: KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            return TetrisActionName.DOWN;
        } else if (e.key === 'ArrowLeft') {
            return TetrisActionName.LEFT;
        } else if (e.key === 'ArrowRight') {
            return TetrisActionName.RIGHT;
        } else if (e.key === 'ArrowUp') {
            return TetrisActionName.ROTATE;
        } else {
            return TetrisActionName.EMPTY;
        }

    }));
