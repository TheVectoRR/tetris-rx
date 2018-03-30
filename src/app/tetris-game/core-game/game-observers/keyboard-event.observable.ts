import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import { TetrisActionName } from '../game-objects/tetris-utils';


export let keyboardObservable$: Observable<TetrisActionName> = Observable.fromEvent(document, 'keydown')
    .map((e: KeyboardEvent) => {
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

    });
