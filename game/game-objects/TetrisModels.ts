export interface TetrisBlock {
    xPos: number;
    yPos: number;
    color: string;
}

export enum TetrisActionName{LEFT, RIGHT, DOWN, ROTATE}