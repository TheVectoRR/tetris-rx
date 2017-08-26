import {TetrisGrid} from "./game-objects/TetrisGrid";
import {TetrisActionName} from "./game-objects/TetrisModels";
import {keyboardObservable} from "./game-observers/KeyboardEventObserver";
import {TetrisGraphics} from "./TetrisGraphics";
import {TetrisShape} from "./game-objects/TetrisShape";
import {LShape} from "./game-objects/LShape";
import {TimerObserver} from "./game-observers/TimerObserver";

export class TetrisGameController {

    private tetrisGrid: TetrisGrid;
    private movingShape: TetrisShape;

    constructor(readonly numOfBlocksWide: number,
                readonly numOfBlocksHigh: number,
                readonly tetrisGraphics: TetrisGraphics) {
        this.tetrisGrid = new TetrisGrid(numOfBlocksWide, numOfBlocksHigh);
        this.movingShape = new LShape();
        this.tetrisGraphics.drawBlocks(this.tetrisGrid.getAllBlocks());
    }

    private moveRight(): void {
        let cloneShape: TetrisShape = this.movingShape.clone().moveRight();
        if(this.tetrisGrid.collisionDetection(cloneShape.blocks)){
            this.movingShape.moveRight();
        }
    }

    private moveLeft(): void {
        let cloneShape: TetrisShape = this.movingShape.clone().moveLeft();
        if(this.tetrisGrid.collisionDetection(cloneShape.blocks)){
            this.movingShape.moveLeft();
        }
    }

    private moveDown(): void {
        let cloneShape: TetrisShape = this.movingShape.clone().moveDown();
        if(this.tetrisGrid.blockCollisionDetection(cloneShape.blocks)){
            this.tetrisGrid.giveBlocksToGrid(this.movingShape.blocks);
            let numOfFullRows:number[] = this.tetrisGrid.detectFullRows(); // TODO create and update score
            numOfFullRows.forEach((value) => this.tetrisGrid.removeRow(value));
            this.movingShape = new LShape(); // TODO: get a new random shape
        }
        else if(this.tetrisGrid.collisionDetection(cloneShape.blocks)){
            this.movingShape.moveDown();
        }
    }

    private rotate() {
        let cloneShape: TetrisShape = this.movingShape.clone().rotate();
        if(this.tetrisGrid.collisionDetection(cloneShape.blocks)){
            this.movingShape.rotate();
        }
    }

    public observeKeyboard() {
        keyboardObservable.subscribe(
            (action: TetrisActionName) => {
                this.performAction(action);
            },
            e => console.log(`error: ${e}`),
            () => console.log('complete')
        );
    }

    public observeTimer(){
        TimerObserver.subscribe(
            (action: TetrisActionName) => {
                this.performAction(action);
            }
        )
    }

    private performAction(action: TetrisActionName){
        this.tetrisGraphics.clearDraw();

        switch(action){
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

        this.tetrisGraphics.drawBlocks(this.tetrisGrid.getAllBlocks());
        this.tetrisGraphics.drawBlocks(this.movingShape.blocks);
    }
}
