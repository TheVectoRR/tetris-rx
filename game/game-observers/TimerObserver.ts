import { Observable } from 'rxjs/Observable';
import { Observer } from "rxjs/Observer";
import { TetrisActionName } from "../game-objects/TetrisUtils";

export let TimerObserver: Observable<TetrisActionName> = Observable.create((observer: Observer<TetrisActionName>) => {

    let produceTick = () => {
        observer.next(TetrisActionName.DOWN);

        setTimeout(produceTick, 500);

    };

    produceTick();

});