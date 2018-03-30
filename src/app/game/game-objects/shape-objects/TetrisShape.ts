import { getTetrisShape, TetrisBlock, TetrisShapeName } from '../TetrisUtils';

export abstract class TetrisShape {

    public rotatePosition = 0;
    protected _blocks: TetrisBlock[] = [];

    constructor(readonly tetrisShapeName: TetrisShapeName) {
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

    public get blocks(): TetrisBlock[] {
        return this._blocks;
    }

    public performMove(move: (shape: TetrisShape) => (void)): this {
        move(this);
        return this;
    }

    public get clone(): TetrisShape {
        const shape: TetrisShape = getTetrisShape(this.tetrisShapeName);
        shape.rotatePosition = this.rotatePosition;
        shape._blocks = this.cloneOfBlocks;
        return shape;
    }

    private get cloneOfBlocks(): TetrisBlock[] {
        const blocks: TetrisBlock[] = [];
        for (const block of this._blocks) {
            blocks.push({
                xPos: block.xPos,
                yPos: block.yPos,
                color: block.color
            });
        }
        return blocks;
    }

    public abstract rotate(shape: TetrisShape): void;
}
