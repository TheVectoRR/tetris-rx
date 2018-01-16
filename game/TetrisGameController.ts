import { TetrisGrid } from "./game-objects/TetrisGrid";
import { TetrisActionName } from "./game-objects/TetrisUtils";
import { keyboardObservable$ } from "./game-observers/KeyboardEventObserver";
import { TetrisGraphics } from "./TetrisGraphics";
import { TetrisShape } from "./game-objects/shape-objects/TetrisShape";
import { getRandomTetrisShape } from "./game-observers/RandomShapeGeneratorStreamObservable";
import { Observable } from  "rxjs/Observable";
import 'rxjs/add/observable/interval';

export class TetrisGameController {

    private tetrisGrid: TetrisGrid;
    private movingShape: TetrisShape;
    private score: number = 0;
    private numberOfRowsScored: number = 0;

    constructor(readonly numOfBlocksWide: number,
                readonly numOfBlocksHigh: number,
                readonly tetrisGraphics: TetrisGraphics,
                private tetrisScoreDiv: HTMLElement) {
        this.tetrisGrid = new TetrisGrid(numOfBlocksWide, numOfBlocksHigh);
        this.movingShape = getRandomTetrisShape();
        this.tetrisGraphics.drawBlocks(this.tetrisGrid.getAllBlocks());
        this.updateScore();
    }

    public startGame() {
        keyboardObservable$.subscribe(
            (action: TetrisActionName) => {
                this.performAction(action);
            }
        );

        Observable.interval(200)
            .map(() => TetrisActionName.DOWN)
            .subscribe(
            (action: TetrisActionName) => {
                this.performAction(action);
            }
        )
    }

    private moveRight(): void {
        let cloneShape: TetrisShape = this.movingShape.clone().moveRight();
        if (this.tetrisGrid.collisionDetection(cloneShape.blocks)) {
            this.movingShape.moveRight();
        }
    }

    private moveLeft(): void {
        let cloneShape: TetrisShape = this.movingShape.clone().moveLeft();
        if (this.tetrisGrid.collisionDetection(cloneShape.blocks)) {
            this.movingShape.moveLeft();
        }
    }

    private moveDown(): void {
        let cloneShape: TetrisShape = this.movingShape.clone().moveDown();
        if (this.tetrisGrid.blockCollisionDetection(cloneShape.blocks)) {
            this.tetrisGrid.giveBlocksToGrid(this.movingShape.blocks);
            let numOfFullRows: number[] = this.tetrisGrid.detectFullRows();
            this.updateScore(numOfFullRows);
            numOfFullRows.forEach((value) => this.tetrisGrid.removeRow(value));
            this.movingShape = getRandomTetrisShape();
        }
        else if (this.tetrisGrid.collisionDetection(cloneShape.blocks)) {
            this.movingShape.moveDown();
        }
    }

    private rotate() {
        let cloneShape: TetrisShape = this.movingShape.clone().rotate();
        if (this.tetrisGrid.collisionDetection(cloneShape.blocks)) {
            this.movingShape.rotate();
        }
    }

    private performAction(action: TetrisActionName) {
        this.tetrisGraphics.clearDraw();

        switch (action) {
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

    private updateScore(linesCompleted: number[] = []) {
        this.score += 100 * linesCompleted.length;
        this.numberOfRowsScored += linesCompleted.length;

        this.tetrisScoreDiv.innerHTML = `
            <div>
                <p><b>Score:</b> ${this.score}</p>
                <p><b>lines:</b> ${this.numberOfRowsScored}</p>
            </div>
`
    }
}
