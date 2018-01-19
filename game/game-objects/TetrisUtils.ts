import { TetrisShape } from './shape-objects/TetrisShape';
import { IShape } from './shape-objects/IShape';
import { JShape } from './shape-objects/JShape';
import { LShape } from './shape-objects/LShape';
import { OShape } from './shape-objects/OShape';
import { SShape } from './shape-objects/SShape';
import { TShape } from './shape-objects/TShape';
import { ZShape } from './shape-objects/ZShape';

export interface TetrisBlock {
    xPos: number;
    yPos: number;
    color: string;
}

export enum TetrisActionName{ LEFT, RIGHT, DOWN, ROTATE, EMPTY }

export enum TetrisShapeName{ NUMBER_OF_SHAPES = 7, ISHAPE= 0, JSHAPE =1, LSHAPE=2, OSHAPE=3, SSHAPE=4, TSHAPE=5, ZSHAPE=6 }

export function getTetrisShape(index: TetrisShapeName): TetrisShape {
    switch(index){
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