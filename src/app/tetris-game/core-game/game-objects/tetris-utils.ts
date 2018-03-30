import { TetrisShape } from './shape-objects/tetris-shape';
import { IShape } from './shape-objects/i-shape';
import { JShape } from './shape-objects/j-shape';
import { LShape } from './shape-objects/l-shape';
import { OShape } from './shape-objects/o-shape';
import { SShape } from './shape-objects/s-shape';
import { TShape } from './shape-objects/t-shape';
import { ZShape } from './shape-objects/z-shape';

export interface TetrisBlock {
    xPos: number;
    yPos: number;
    color: string;
}

export enum TetrisActionName { LEFT, RIGHT, DOWN, ROTATE, EMPTY }

export enum TetrisShapeName { NUMBER_OF_SHAPES= 7, ISHAPE= 0, JSHAPE = 1, LSHAPE= 2, OSHAPE= 3, SSHAPE= 4, TSHAPE= 5, ZSHAPE= 6 }

export function getTetrisShape(index: TetrisShapeName): TetrisShape {
    switch (index) {
        case TetrisShapeName.ISHAPE:
            return new IShape();
        case TetrisShapeName.JSHAPE:
            return new JShape();
        case TetrisShapeName.LSHAPE:
            return new LShape();
        case TetrisShapeName.OSHAPE:
            return new OShape();
        case TetrisShapeName.SSHAPE:
            return new SShape();
        case TetrisShapeName.TSHAPE:
            return new TShape();
        case TetrisShapeName.ZSHAPE:
            return new ZShape();
        default:
            console.error('undefined tetris shape');
            return new OShape();

    }
}
