import { TetrisShape } from './TetrisShape';
import { TetrisBlock, TetrisShapeName } from '../TetrisUtils';

const SHAPE_COLOR = 'yellow';

export class OShape extends TetrisShape {

    constructor() {
        super(TetrisShapeName.OSHAPE);
        this._blocks.push(
            { xPos: 4, yPos: -3, color: SHAPE_COLOR },
            { xPos: 4, yPos: -2, color: SHAPE_COLOR },
            { xPos: 5, yPos: -3, color: SHAPE_COLOR },
            { xPos: 5, yPos: -2, color: SHAPE_COLOR }
        )
    }

    public rotate(shape: TetrisShape): void {

    }

}