import {TetrisBlock} from "./TetrisModels";
import {TetrisShape} from "./TetrisShape";
import {LShape} from "./LShape";
export class TetrisGrid {

    private _blocks: TetrisBlock[] = [];
    private _movingShape: TetrisShape;

    constructor() {
        this._blocks.push(
            {xPos: 0, yPos: 19, color: 'red'},
            {xPos: 1, yPos: 19, color: 'blue'},
            {xPos: 5, yPos: 19, color: 'red'},
            {xPos: 9, yPos: 19, color: 'red'}
        );

        this._movingShape = new LShape();
    }

    get blocks(): TetrisBlock[] {
        return this._blocks;
    }

    get movingShape(): TetrisShape {
        return this._movingShape;
    }
}