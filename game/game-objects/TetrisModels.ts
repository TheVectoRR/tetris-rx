export interface TetrisBlock {
    xPos: number;
    yPos: number;
    color: string;
}

export enum TetrisActionNames{LEFT, RIGHT, DOWN, ROTATE}