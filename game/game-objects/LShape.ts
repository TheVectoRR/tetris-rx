import {TetrisShape} from "./TetrisShape";

const SHAPE_COLOR = 'blue';

export class LShape extends TetrisShape{

    constructor(){
        super();
        this.blocks.push(
            {xPos:4, yPos:0, color:SHAPE_COLOR},
            {xPos:4, yPos:1, color:SHAPE_COLOR},
            {xPos:4, yPos:2, color:SHAPE_COLOR},
            {xPos:5, yPos:2, color:SHAPE_COLOR}
        )
    }

    rotate(): void {
        console.log('rotate LShape');
    }

}