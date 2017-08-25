import {TetrisGrid} from "./game-objects/TetrisGrid";
import {TetrisActionName} from "./game-objects/TetrisModels";
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
        this.tetrisGrid = new TetrisGrid(numOfBlocksWide, numOfBlocksHigh);
        this.movingShape = new LShape();
        this.tetrisGraphics.drawBlocks(this.tetrisGrid.blocks);
    }

    private moveRight(): void {
        let cloneShape: TetrisShape = this.movingShape.clone().moveRight();
        if(cloneShape.blocks.filter((block) =>
            this.tetrisGrid.collisionDetected(block)).length === 0){
            this.movingShape.moveRight();
        }
    }

    private moveLeft(): void {
        let cloneShape: TetrisShape = this.movingShape.clone().moveLeft();
        if(cloneShape.blocks.filter((block) =>
                this.tetrisGrid.collisionDetected(block)).length === 0){
            this.movingShape.moveLeft();
        }
    }

    private moveDown(): void {
        let cloneShape: TetrisShape = this.movingShape.clone().moveDown();
        if(cloneShape.blocks.filter((block) =>
                this.tetrisGrid.collisionDetected(block)).length === 0){
            this.movingShape.moveDown();
        }
    }

    private rotate() {
        let cloneShape: TetrisShape = this.movingShape.clone().rotate();
        if(cloneShape.blocks.filter((block) =>
                this.tetrisGrid.collisionDetected(block)).length === 0){
            this.movingShape.rotate();
        }
    }

    public observeKeyboard() {
        keyboardObservable.subscribe(
            (value: TetrisActionName) => {
                this.tetrisGraphics.clearDraw();

                switch(value){
                    case TetrisActionName.LEFT:
                        this.moveLeft();
                        break;
                    case TetrisActionName.RIGHT:
                        this.moveRight();
                        break;
                    case TetrisActionName.DOWN:
                        this.moveDown();
                        break;
                    case TetrisActionName.ROTATE:
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
