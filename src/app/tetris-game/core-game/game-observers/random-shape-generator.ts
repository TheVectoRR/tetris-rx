import { TetrisShape } from '../game-objects/shape-objects/tetris-shape';
import { getTetrisShape, TetrisShapeName } from '../game-objects/tetris-utils';

export function getRandomTetrisShape(): TetrisShape {
    const randomValue: number = Math.floor(Math.random() * TetrisShapeName.NUMBER_OF_SHAPES);
    return getTetrisShape(randomValue);
}
