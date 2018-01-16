import { TetrisShape } from "../game-objects/shape-objects/TetrisShape";
import { getTetrisShape, TetrisShapeName } from "../game-objects/TetrisUtils";

// TODO no observable stream of shapes yet
export function getRandomTetrisShape(): TetrisShape {
    let randomValue: number = Math.floor(Math.random() * TetrisShapeName.NUMBER_OF_SHAPES);
    return getTetrisShape(randomValue)!;
}