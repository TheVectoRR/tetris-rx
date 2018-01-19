import { getTetrisShape, TetrisBlock, TetrisShapeName } from '../TetrisUtils';

export abstract class TetrisShape {

    public rotatePosition: number = 0;
    protected _blocks: TetrisBlock[] = [];

    constructor(readonly tetrisShapeName: TetrisShapeName) {
    }

    public get blocks(): TetrisBlock[] {
        return this._blocks;
    }

    public performMove(move: (shape:TetrisShape) => (void)): this {
        move(this);
        return this;
    }

    public get clone(): TetrisShape {
        let shape: TetrisShape = getTetrisShape(this.tetrisShapeName);
        shape.rotatePosition = this.rotatePosition;
        shape._blocks = this.cloneOfBlocks;
        return shape;
    }

    private get cloneOfBlocks(): TetrisBlock[] {
        let blocks: TetrisBlock[] = [];
        for (let block of this._blocks) {
            blocks.push({
                xPos: block.xPos,
                yPos: block.yPos,
                color: block.color
            });
        }
        return blocks;
    }

    public static moveRight(shape: TetrisShape) {
        shape.blocks.map((block) => block.xPos += 1);
    }

    public static moveLeft(shape: TetrisShape) {
        shape.blocks.map((block) => block.xPos -= 1);
    }

    public static moveDown(shape: TetrisShape) {
        shape.blocks.map((block) => block.yPos += 1);
    }

    public abstract rotate(shape: TetrisShape): void;
}