import {TetrisBlock} from "../TetrisModels";

export abstract class TetrisShape {

    blocks: TetrisBlock[] = [];

    public moveRight(): this {
        this.blocks.map(block => block.xPos += 1);
        return this;
    }

    public moveLeft(): this {
        this.blocks.map(block => block.xPos -= 1);
        return this;
    }

    public moveDown(): this {
        this.blocks.map(block => block.yPos += 1);
        return this;
    }

    protected getCloneOfBlocks(): TetrisBlock[]{
        let blocks: TetrisBlock[] = [];
        for(let block of this.blocks){
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