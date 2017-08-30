import {TetrisShape} from "./TetrisShape";

const SHAPE_COLOR = 'cyan';

export class IShape extends TetrisShape {

    private rotatePosition: number = 0;

    constructor() {
        super();
        this.blocks.push(
            {xPos: 5, yPos: -4, color: SHAPE_COLOR},
            {xPos: 5, yPos: -3, color: SHAPE_COLOR},
            {xPos: 5, yPos: -2, color: SHAPE_COLOR},
            {xPos: 5, yPos: -1, color: SHAPE_COLOR}
        )
    }

    public rotate(): this {
        IShape.rotateShape(this);
        this.rotatePosition = (this.rotatePosition+1)%2;
        return this;
    }

    public clone(): TetrisShape{
        let ls: IShape = new IShape();
        ls.rotatePosition = this.rotatePosition;
        ls._blocks= this.getCloneOfBlocks();
        return ls;
    }

    private static rotateShape(shape: IShape): void{
        switch (shape.rotatePosition) {
            case 0:
                shape.blocks[0].xPos -= 2;
                shape.blocks[0].yPos += 2;

                shape.blocks[1].xPos -= 1;
                shape.blocks[1].yPos += 1;

                shape.blocks[3].xPos += 1;
                shape.blocks[3].yPos -= 1;
                break;
            case 1:
                shape.blocks[0].xPos += 2;
                shape.blocks[0].yPos -= 2;

                shape.blocks[1].xPos += 1;
                shape.blocks[1].yPos -= 1;

                shape.blocks[3].xPos -= 1;
                shape.blocks[3].yPos += 1;
                break;
        }
    }

}