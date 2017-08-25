import {TetrisShape} from "./TetrisShape";

const SHAPE_COLOR = 'blue';

export class LShape extends TetrisShape {

    private rotatePosition: number = 0;

    constructor() {
        super();
        this.blocks.push(
            {xPos: 4, yPos: -3, color: SHAPE_COLOR},
            {xPos: 4, yPos: -2, color: SHAPE_COLOR},
            {xPos: 4, yPos: -1, color: SHAPE_COLOR},
            {xPos: 5, yPos: -1, color: SHAPE_COLOR}
        )
    }

    public rotate(): this {
        LShape.rotateShape(this);
        this.rotatePosition = (this.rotatePosition+1)%4;
        return this;
    }

    public clone(): TetrisShape{
        let ls: LShape = new LShape();
        ls.rotatePosition = this.rotatePosition;
        ls.blocks = this.getCloneOfBlocks();
        return ls;
    }

    private static rotateShape(shape: LShape): LShape{
        switch (shape.rotatePosition) {
            case 0:
                shape.blocks[0].xPos += 1;
                shape.blocks[0].yPos += 1;

                shape.blocks[2].xPos -= 1;
                shape.blocks[2].yPos -= 1;

                shape.blocks[3].xPos -= 2;
                break;
            case 1:
                shape.blocks[0].xPos -= 1;
                shape.blocks[0].yPos += 1;

                shape.blocks[2].xPos += 1;
                shape.blocks[2].yPos -= 1;

                shape.blocks[3].yPos -= 2;
                break;
            case 2:
                shape.blocks[0].xPos -= 1;
                shape.blocks[0].yPos -= 1;

                shape.blocks[2].xPos += 1;
                shape.blocks[2].yPos += 1;

                shape.blocks[3].xPos += 2;
                break;
            case 3:
                shape.blocks[0].xPos += 1;
                shape.blocks[0].yPos -= 1;

                shape.blocks[2].xPos -= 1;
                shape.blocks[2].yPos += 1;

                shape.blocks[3].yPos += 2;
                break;
        }
        return shape;
    }

}