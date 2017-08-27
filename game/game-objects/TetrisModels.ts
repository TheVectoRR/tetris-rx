export interface TetrisBlock {
    xPos: number;
    yPos: number;
    color: string;
}

export enum TetrisActionName{LEFT, RIGHT, DOWN, ROTATE}

export enum TetrisShapeName{NUMBER_OF_SHAPES = 7, ISHAPE= 0, JSHAPE =1, LSHAPE=2, OSHAPE=3, SSHAPE=4, TSHAPE=5, ZSHAPE=6}