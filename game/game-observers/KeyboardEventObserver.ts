import {Observable} from 'rxjs';
import {TetrisAction} from "../game-objects/TetrisModels";


export let keyboardObservable = Observable.fromEvent(document, "keydown")
    .map((e: KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            return TetrisAction.DOWN;
        }
        else if (e.key === 'ArrowLeft') {
            return TetrisAction.LEFT;
        }
        else if (e.key === 'ArrowRight') {
            return TetrisAction.RIGHT;
        }

    });
