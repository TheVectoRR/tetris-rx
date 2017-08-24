import {TetrisBlock} from "./TetrisModels";

export abstract class TetrisShape {

    blocks: TetrisBlock[] = [];

    moveRight(): void {
        for (let block of this.blocks) {
            block.xPos += 1;
        }
    }

    moveLeftt(): void {
        for (let block of this.blocks) {
            block.xPos += -1;
        }
    }

    moveDown(): void {
        for (let block of this.blocks) {
            block.yPos += 1;
        }
    }

    abstract rotate(): void;

}