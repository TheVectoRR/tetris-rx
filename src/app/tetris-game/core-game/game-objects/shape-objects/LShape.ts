import { TetrisShape } from './TetrisShape';
import { TetrisBlock } from '../TetrisUtils';

const SHAPE_COLOR = 'orange';

export class LShape extends TetrisShape {

    constructor(blocks?: TetrisBlock[]) {
        super();
        if (blocks) {
            this._blocks = blocks;
        } else {
            this._blocks.push(
                { xPos: 4, yPos: -3, color: SHAPE_COLOR },
                { xPos: 4, yPos: -2, color: SHAPE_COLOR },
                { xPos: 4, yPos: -1, color: SHAPE_COLOR },
                { xPos: 5, yPos: -1, color: SHAPE_COLOR }
            );
        }
    }

    private static rotateShape(shape: TetrisShape) {
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
    }

    public rotate(shape: TetrisShape): void {
        LShape.rotateShape(shape);
        shape.rotatePosition = (shape.rotatePosition + 1) % 4;
    }

    public cloneOfShape(): TetrisShape {
        const shape = new LShape(this.cloneOfBlocks);
        shape.rotatePosition = this.rotatePosition;
        return shape;
    }
}
