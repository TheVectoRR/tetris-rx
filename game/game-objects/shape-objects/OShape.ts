import {TetrisShape} from "./TetrisShape";

const SHAPE_COLOR = 'yellow';

export class OShape extends TetrisShape {

    constructor() {
        super();
        this.blocks.push(
            {xPos: 4, yPos: -3, color: SHAPE_COLOR},
            {xPos: 4, yPos: -2, color: SHAPE_COLOR},
            {xPos: 5, yPos: -3, color: SHAPE_COLOR},
            {xPos: 5, yPos: -2, color: SHAPE_COLOR}
        )
    }

    public rotate(): this {
        return this;
    }

    public clone(): TetrisShape{
        let ls: OShape = new OShape();
        ls._blocks = this.getCloneOfBlocks();
        return ls;
    }

}