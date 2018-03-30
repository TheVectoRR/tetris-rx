import { TetrisShape } from '../game-objects/shape-objects/TetrisShape';
import { getTetrisShape, TetrisShapeName } from '../game-objects/TetrisUtils';

export function getRandomTetrisShape(): TetrisShape {
    const randomValue: number = Math.floor(Math.random() * TetrisShapeName.NUMBER_OF_SHAPES);
    return getTetrisShape(randomValue);
}
