import {TetrisBlock} from "../TetrisModels";

export abstract class TetrisShape {

    protected _blocks: TetrisBlock[] = [];

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


    get blocks(): TetrisBlock[] {
        return this._blocks;
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

    public abstract clone(): TetrisShape;

}