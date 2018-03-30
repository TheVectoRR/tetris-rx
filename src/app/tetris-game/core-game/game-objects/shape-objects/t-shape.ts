import { TetrisShape } from './tetris-shape';
import { TetrisBlock } from '../tetris-utils';

const SHAPE_COLOR = 'grey';

export class TShape extends TetrisShape {

    constructor(blocks?: TetrisBlock[]) {
        super();
        if (blocks) {
            this._blocks = blocks;
        } else {
            this._blocks.push(
                { xPos: 4, yPos: -3, color: SHAPE_COLOR },
                { xPos: 4, yPos: -2, color: SHAPE_COLOR },
                { xPos: 4, yPos: -1, color: SHAPE_COLOR },
                { xPos: 5, yPos: -2, color: SHAPE_COLOR }
            );
        }
    }

    private static rotateShape(shape: TetrisShape) {
        switch (shape.rotatePosition) {
            case 0:
                shape.blocks[ 0 ].xPos += 1;
                shape.blocks[ 0 ].yPos += 1;

                shape.blocks[ 2 ].xPos -= 1;
                shape.blocks[ 2 ].yPos -= 1;

                shape.blocks[ 3 ].xPos -= 1;
                shape.blocks[ 3 ].yPos += 1;
                break;
            case 1:
                shape.blocks[ 0 ].xPos -= 1;
                shape.blocks[ 0 ].yPos += 1;

                shape.blocks[ 2 ].xPos += 1;
                shape.blocks[ 2 ].yPos -= 1;

                shape.blocks[ 3 ].xPos -= 1;
                shape.blocks[ 3 ].yPos -= 1;
                break;
            case 2:
                shape.blocks[ 0 ].xPos -= 1;
                shape.blocks[ 0 ].yPos -= 1;

                shape.blocks[ 2 ].xPos += 1;
                shape.blocks[ 2 ].yPos += 1;

                shape.blocks[ 3 ].xPos += 1;
                shape.blocks[ 3 ].yPos -= 1;
                break;
            case 3:
                shape.blocks[ 0 ].xPos += 1;
                shape.blocks[ 0 ].yPos -= 1;

                shape.blocks[ 2 ].xPos -= 1;
                shape.blocks[ 2 ].yPos += 1;

                shape.blocks[ 3 ].xPos += 1;
                shape.blocks[ 3 ].yPos += 1;
                break;
        }
    }

    public rotate(shape: TetrisShape): void {
        TShape.rotateShape(shape);
        shape.rotatePosition = (shape.rotatePosition + 1) % 4;
    }

    public cloneOfShape(): TetrisShape {
        const shape = new TShape(this.cloneOfBlocks);
        shape.rotatePosition = this.rotatePosition;
        return shape;
    }

}
