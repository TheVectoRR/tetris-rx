import { TetrisShape } from './shape-objects/TetrisShape';
import { IShape } from './shape-objects/IShape';
import { JShape } from './shape-objects/JShape';
import { LShape } from './shape-objects/LShape';
import { OShape } from './shape-objects/OShape';
import { SShape } from './shape-objects/SShape';
import { TShape } from './shape-objects/TShape';
import { ZShape } from './shape-objects/ZShape';
import { Observable } from 'rxjs/Observable';

export interface TetrisBlock {
    xPos: number;
    yPos: number;
    color: string;
}

export enum TetrisActionName{ LEFT, RIGHT, DOWN, ROTATE, EMPTY }

export enum TetrisShapeName{ NUMBER_OF_SHAPES = 7, ISHAPE= 0, JSHAPE =1, LSHAPE=2, OSHAPE=3, SSHAPE=4, TSHAPE=5, ZSHAPE=6 }

export function getTetrisShape$(index: TetrisShapeName): Observable<TetrisShape>{
    switch(index){
        case TetrisShapeName.ISHAPE:
            return Observable.of(new IShape());
        case TetrisShapeName.JSHAPE:
            return Observable.of(new JShape());
        case TetrisShapeName.LSHAPE:
            return Observable.of(new LShape());
        case TetrisShapeName.OSHAPE:
            return Observable.of(new OShape());
        case TetrisShapeName.SSHAPE:
            return Observable.of(new SShape());
        case TetrisShapeName.TSHAPE:
            return Observable.of(new TShape());
        case TetrisShapeName.ZSHAPE:
            return Observable.of(new ZShape());
        default:
            console.error('undefined tetris shape');
            return Observable.of(new OShape());

    }
}

export function moveRight(block: TetrisBlock): void{
    block.xPos += 1
}

export function moveLeft(block: TetrisBlock): void{
    block.xPos -= 1
}

export function moveDown(block: TetrisBlock): void{
    block.yPos += 1
}