import {TetrisGrid} from "./game-objects/TetrisGrid";
import {TetrisActionNames} from "./game-objects/TetrisModels";
import {keyboardObservable} from "./game-observers/KeyboardEventObserver";
import {TetrisGraphics} from "./TetrisGraphics";
import {TetrisShape} from "./game-objects/TetrisShape";
import {LShape} from "./game-objects/LShape";

export class TetrisGameController {

    private tetrisGrid: TetrisGrid;
    private movingShape: TetrisShape;

    constructor(readonly numOfBlocksWide: number,
                readonly numOfBlocksHigh: number,
                readonly tetrisGraphics: TetrisGraphics) {
        this.tetrisGrid = new TetrisGrid();
        this.movingShape = new LShape();
        this.tetrisGraphics.drawBlocks(this.tetrisGrid.blocks);
    }

    private moveRight(): void {
        if(this.movingShape.blocks.filter((block) =>
            (block.xPos >= this.numOfBlocksWide-1) || this.tetrisGrid.isBlockAtPosition(block.xPos +1, block.yPos)).length === 0){
            this.movingShape.moveRight();
        }
    }

    private moveLeft(): void {
        if(this.movingShape.blocks.filter((block) =>
            (block.xPos <= 0) || this.tetrisGrid.isBlockAtPosition(block.xPos -1, block.yPos)).length === 0){
            this.movingShape.moveLeft();
        }
    }

    private moveDown(): void {
        if(this.movingShape.blocks.filter((block) =>
            (block.yPos >= this.numOfBlocksHigh-1) || this.tetrisGrid.isBlockAtPosition(block.xPos, block.yPos+1)).length === 0){
            this.movingShape.moveDown();
        }
    }

    private rotate() {
        // TODO: collision detection for rotate
        this.movingShape.rotate();
    }

    public observeKeyboard() {
        keyboardObservable.subscribe(
            (value: TetrisActionNames) => {
                this.tetrisGraphics.clearDraw();

                switch(value){
                    case TetrisActionNames.LEFT:
                        this.moveLeft();
                        break;
                    case TetrisActionNames.RIGHT:
                        this.moveRight();
                        break;
                    case TetrisActionNames.DOWN:
                        this.moveDown();
                        break;
                    case TetrisActionNames.ROTATE:
                        this.rotate();
                        break;

                }

                this.tetrisGraphics.drawBlocks(this.tetrisGrid.blocks);
                this.tetrisGraphics.drawBlocks(this.movingShape.blocks);
            },
            e => console.log(`error: ${e}`),
            () => console.log('complete')
        );
    }
}
