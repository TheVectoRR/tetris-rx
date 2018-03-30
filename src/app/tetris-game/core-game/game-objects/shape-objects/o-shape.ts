import { TetrisShape } from './tetris-shape';
import { TetrisBlock } from '../tetris-utils';

const SHAPE_COLOR = 'yellow';

export class OShape extends TetrisShape {

    constructor(blocks?: TetrisBlock[]) {
        super();
        if (blocks) {
            this._blocks = blocks;
        } else {
            this._blocks.push(
                { xPos: 4, yPos: -3, color: SHAPE_COLOR },
                { xPos: 4, yPos: -2, color: SHAPE_COLOR },
                { xPos: 5, yPos: -3, color: SHAPE_COLOR },
                { xPos: 5, yPos: -2, color: SHAPE_COLOR }
            );
        }
    }

    public rotate(shape: TetrisShape): void {

    }

    public cloneOfShape(): TetrisShape {
        const shape = new OShape(this.cloneOfBlocks);
        shape.rotatePosition = this.rotatePosition;
        return shape;
    }

}
