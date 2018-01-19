import { TetrisShape } from '../game-objects/shape-objects/TetrisShape';
import { getTetrisShape, TetrisShapeName } from '../game-objects/TetrisUtils';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export function getRandomTetrisShape$(): Observable<TetrisShape> {
    let randomValue: number = Math.floor(Math.random() * TetrisShapeName.NUMBER_OF_SHAPES);
    return Observable.of(getTetrisShape(randomValue));
}