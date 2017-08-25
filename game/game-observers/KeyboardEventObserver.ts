import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import {TetrisActionNames} from "../game-objects/TetrisModels";


export let keyboardObservable:Observable<TetrisActionNames|undefined> = Observable.fromEvent(document, "keydown")
    .map((e: KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            return TetrisActionNames.DOWN;
        }
        else if (e.key === 'ArrowLeft') {
            return TetrisActionNames.LEFT;
        }
        else if (e.key === 'ArrowRight') {
            return TetrisActionNames.RIGHT;
        }
        else if (e.key === 'ArrowUp') {
            return TetrisActionNames.ROTATE;
        }

    });
