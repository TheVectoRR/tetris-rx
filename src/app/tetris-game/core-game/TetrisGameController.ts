import { TetrisGrid } from './game-objects/TetrisGrid';
import { TetrisActionName } from './game-objects/TetrisUtils';
import { keyboardObservable$ } from './game-observers/KeyboardEventObserver';
import { TetrisGraphics } from './TetrisGraphics';
import { TetrisShape } from './game-objects/shape-objects/TetrisShape';
import { getRandomTetrisShape } from './game-observers/RandomShapeGeneratorObservable';
import { Observable } from 'rxjs/Observable';
import { combineLatest, map, tap } from 'rxjs/operators';
import 'rxjs/add/observable/interval';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

export class TetrisGameController {

    private tetrisGrid: TetrisGrid;
    private score = 0;
    private numberOfRowsScored = 0;
    private tetrisShapeSubject: Subject<TetrisShape> = new Subject();
    private subscriptions: Subscription[] = [];

    constructor(private readonly numOfBlocksWide: number,
                private readonly numOfBlocksHigh: number,
                private readonly tetrisGraphics: TetrisGraphics) {
        this.tetrisGrid = new TetrisGrid(numOfBlocksWide, numOfBlocksHigh);
        this.tetrisGraphics.drawBlocks(this.tetrisGrid.getAllBlocks());
        this.updateScore();
    }

    public gameLoop() {

        const drawGraphicsObserver = {
            next: (shape: TetrisShape) => {
                this.tetrisGraphics.clearDraw();
                this.tetrisGraphics.drawBlocks(this.tetrisGrid.getAllBlocks());
                this.tetrisGraphics.drawBlocks(shape.blocks);
            }
        };

        this.subscriptions = [
            keyboardObservable$.pipe(
                combineLatest(this.tetrisShapeSubject),
                tap(([ action, shape ]) => this.performAction(shape, action)),
                map(([ , shape ]) => shape)
            ).subscribe(drawGraphicsObserver),

            Observable.interval(200).pipe(
                combineLatest(this.tetrisShapeSubject),
                tap(([ , shape ]) => this.performAction(shape, TetrisActionName.DOWN)),
                map(([ , shape ]) => shape)
            ).subscribe(drawGraphicsObserver)
        ];

        this.tetrisShapeSubject.next(getRandomTetrisShape());

    }

    private collisionDetected(shape: TetrisShape, move: (shape: TetrisShape) => (void)): boolean {
        const clonedShape: TetrisShape = shape.clone;
        clonedShape.performMove(move);
        return this.tetrisGrid.collisionDetection(clonedShape.blocks);
    }

    private performAction(shape: TetrisShape, action: TetrisActionName): void {

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
                } else if (TetrisGrid.isEndGame(shape.blocks)) {
                    console.log('end game');
                    this.tetrisGraphics.drawBlocks(shape.blocks);
                    this.tetrisShapeSubject.complete();
                    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
                } else {
                    this.tetrisGrid.giveBlocksToGrid(shape.blocks);
                    const numOfFullRows: number[] = this.tetrisGrid.detectFullRows();
                    this.updateScore(numOfFullRows);
                    numOfFullRows.forEach((value) => this.tetrisGrid.removeRow(value));
                    this.tetrisShapeSubject.next(getRandomTetrisShape());
                }
                break;
            case TetrisActionName.ROTATE:
                if (!this.collisionDetected(shape, shape.rotate)) {
                    shape.performMove(shape.rotate);
                }
        }

    }

    private updateScore(linesCompleted: number[] = []): void {
        this.score += 100 * linesCompleted.length;
        this.numberOfRowsScored += linesCompleted.length;
    }
}
