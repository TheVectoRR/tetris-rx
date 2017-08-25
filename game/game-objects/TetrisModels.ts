export interface TetrisBlock {
    xPos: number;
    yPos: number;
    color: string;
}

export enum TetrisAction{LEFT, RIGHT, DOWN, ROTATE}