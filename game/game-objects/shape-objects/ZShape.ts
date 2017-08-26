import {TetrisShape} from "./TetrisShape";

const SHAPE_COLOR = 'purple';

export class ZShape extends TetrisShape {

    private rotatePosition: number = 0;

    constructor() {
        super();
        this.blocks.push(
            {xPos: 5, yPos: -3, color: SHAPE_COLOR},
            {xPos: 5, yPos: -2, color: SHAPE_COLOR},
            {xPos: 4, yPos: -2, color: SHAPE_COLOR},
            {xPos: 4, yPos: -1, color: SHAPE_COLOR}
        )
    }

    public rotate(): this {
        ZShape.rotateShape(this);
        this.rotatePosition = (this.rotatePosition+1)%2;
        return this;
    }

    public clone(): TetrisShape{
        let ls: ZShape = new ZShape();
        ls.rotatePosition = this.rotatePosition;
        ls.blocks = this.getCloneOfBlocks();
        return ls;
    }

    private static rotateShape(shape: ZShape): void{
        switch (shape.rotatePosition) {
            case 0:
                shape.blocks[0].xPos -= 1;
                shape.blocks[0].yPos += 1;

                shape.blocks[2].xPos += 1;
                shape.blocks[2].yPos += 1;

                shape.blocks[3].xPos += 2;
                break;
            case 1:
                shape.blocks[0].xPos += 1;
                shape.blocks[0].yPos -= 1;

                shape.blocks[2].xPos -= 1;
                shape.blocks[2].yPos -= 1;

                shape.blocks[3].xPos -= 2;
                break;
        }
    }

}