import { TetrisGrid } from './game-objects/TetrisGrid';
import { TetrisActionName } from './game-objects/TetrisUtils';
import { keyboardObservable$ } from './game-observers/KeyboardEventObserver';
import { TetrisGraphics } from './TetrisGraphics';
import { TetrisShape } from './game-objects/shape-objects/TetrisShape';
import { getRandomTetrisShape } from './game-observers/RandomShapeGeneratorObservable';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import 'rxjs/add/observable/interval';

export class TetrisGameController {

    private tetrisGrid: TetrisGrid;
    private score: number = 0;
    private numberOfRowsScored: number = 0;
    private tetrisShape: TetrisShape;

    constructor(readonly numOfBlocksWide: number,
                readonly numOfBlocksHigh: number,
                readonly tetrisGraphics: TetrisGraphics,
                private tetrisScoreDiv: HTMLElement) {
        this.tetrisGrid = new TetrisGrid(numOfBlocksWide, numOfBlocksHigh);
        this.tetrisGraphics.drawBlocks(this.tetrisGrid.getAllBlocks());
        this.updateScore();
    }

    public gameLoop() {

        this.tetrisShape = getRandomTetrisShape();

        keyboardObservable$.pipe(
            tap((action) => this.performAction(this.tetrisShape, action))
        ).subscribe(
            () => {
                this.tetrisGraphics.clearDraw();
                this.tetrisGraphics.drawBlocks(this.tetrisGrid.getAllBlocks());
                this.tetrisGraphics.drawBlocks(this.tetrisShape.blocks);
            }
        );

        Observable.interval(300).pipe(
            tap((shape) => this.performAction(this.tetrisShape, TetrisActionName.DOWN))
        ).subscribe(
            () => {
                this.tetrisGraphics.clearDraw();
                this.tetrisGraphics.drawBlocks(this.tetrisGrid.getAllBlocks());
                this.tetrisGraphics.drawBlocks(this.tetrisShape.blocks);
            }
        );

    }

    private collisionDetected(shape: TetrisShape, move: (shape: TetrisShape) => (void)): boolean {
        let clonedShape: TetrisShape = shape.clone;
        clonedShape.performMove(move);
        return this.tetrisGrid.collisionDetection(clonedShape.blocks);
    }

    private performAction(shape: TetrisShape, action: TetrisActionName) {

        switch (action) {
            case TetrisActionName.LEFT:
                if (!this.collisionDetected(shape, TetrisShape.moveLeft)) {
                    shape.performMove(TetrisShape.moveLeft);
                }
                break;
            case TetrisActionName.RIGHT:
                if (!this.collisionDetected(shape, TetrisShape.moveRight)) {
                    shape.performMove(TetrisShape.moveRight);
                }
                break;
            case TetrisActionName.DOWN:
                if (!this.collisionDetected(shape, TetrisShape.moveDown)) {
                    shape.performMove(TetrisShape.moveDown);
                } else {
                    this.tetrisGrid.giveBlocksToGrid(shape.blocks);
                    let numOfFullRows: number[] = this.tetrisGrid.detectFullRows();
                    this.updateScore(numOfFullRows);
                    numOfFullRows.forEach((value) => this.tetrisGrid.removeRow(value));
                    this.tetrisShape = getRandomTetrisShape();
                }
                break;
            case TetrisActionName.ROTATE:
                if (!this.collisionDetected(shape, shape.rotate)) {
                    shape.performMove(shape.rotate);
                }
        }

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
