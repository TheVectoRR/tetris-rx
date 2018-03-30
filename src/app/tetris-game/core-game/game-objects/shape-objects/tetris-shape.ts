import { TetrisBlock } from '../tetris-utils';

export abstract class TetrisShape {

    public rotatePosition = 0;
    protected _blocks: TetrisBlock[] = [];

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
        return this.cloneOfShape();
    }

    protected get cloneOfBlocks(): TetrisBlock[] {
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

    public abstract cloneOfShape(): TetrisShape;
}
