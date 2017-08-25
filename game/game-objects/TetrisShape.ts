import {TetrisBlock} from "./TetrisModels";

export abstract class TetrisShape {

    blocks: TetrisBlock[] = [];

    public moveRight(): void {
        for (let block of this.blocks) {
            block.xPos += 1;
        }
    }

    public moveLeft(): void {
        for (let block of this.blocks) {
            block.xPos -= 1;
        }
    }

    public moveDown(): void {
        for (let block of this.blocks) {
            block.yPos += 1;
        }
    }

    public abstract rotate(): void;

}