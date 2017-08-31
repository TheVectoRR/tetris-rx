import {getTetrisShape, TetrisBlock, TetrisShapeName} from "../TetrisUtils";

export abstract class TetrisShape {

    protected _blocks: TetrisBlock[] = [];
    protected rotatePosition: number = 0;

    constructor(readonly tetrisShapeName: TetrisShapeName){}

    get blocks(): TetrisBlock[] {
        return this._blocks;
    }

    public moveRight(): this {
        this._blocks.map(block => block.xPos += 1);
        return this;
    }

    public moveLeft(): this {
        this._blocks.map(block => block.xPos -= 1);
        return this;
    }

    public moveDown(): this {
        this._blocks.map(block => block.yPos += 1);
        return this;
    }

    public clone(): TetrisShape{
        let shape: TetrisShape = getTetrisShape(this.tetrisShapeName)!;
        shape.rotatePosition = this.rotatePosition;
        shape._blocks = this.getCloneOfBlocks();
        return shape;
    }

    protected getCloneOfBlocks(): TetrisBlock[]{
        let blocks: TetrisBlock[] = [];
        for(let block of this._blocks){
            blocks.push({
                xPos: block.xPos,
                yPos: block.yPos,
                color: block.color
            });
        }
        return blocks;
    }

    public abstract rotate(): this;
}