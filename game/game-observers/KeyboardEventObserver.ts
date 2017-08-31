import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import {TetrisActionName} from "../game-objects/TetrisUtils";


export let keyboardObservable:Observable<TetrisActionName|undefined> = Observable.fromEvent(document, "keydown")
    .map((e: KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            return TetrisActionName.DOWN;
        }
        else if (e.key === 'ArrowLeft') {
            return TetrisActionName.LEFT;
        }
        else if (e.key === 'ArrowRight') {
            return TetrisActionName.RIGHT;
        }
        else if (e.key === 'ArrowUp') {
            return TetrisActionName.ROTATE;
        }

    });
