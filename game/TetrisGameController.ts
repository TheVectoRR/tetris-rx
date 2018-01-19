import { TetrisGrid } from './game-objects/TetrisGrid';
import { TetrisActionName } from './game-objects/TetrisUtils';
import { keyboardObservable$ } from './game-observers/KeyboardEventObserver';
import { TetrisGraphics } from './TetrisGraphics';
import { TetrisShape } from './game-objects/shape-objects/TetrisShape';
import { getRandomTetrisShape$ } from './game-observers/RandomShapeGeneratorStreamObservable';
import { Observable } from  'rxjs/Observable';
import { combineLatest, tap} from 'rxjs/operators';
import 'rxjs/add/observable/interval';

export class TetrisGameController {

    private tetrisGrid: TetrisGrid;
    private movingShape$: Observable<TetrisShape>;
    private score: number = 0;
    private numberOfRowsScored: number = 0;

    constructor(readonly numOfBlocksWide: number,
                readonly numOfBlocksHigh: number,
                readonly tetrisGraphics: TetrisGraphics,
                private tetrisScoreDiv: HTMLElement) {
        this.tetrisGrid = new TetrisGrid(numOfBlocksWide, numOfBlocksHigh);
        this.movingShape$ = getRandomTetrisShape$();
        this.tetrisGraphics.drawBlocks(this.tetrisGrid.getAllBlocks());
        this.updateScore();
    }

    public startGame() {
        keyboardObservable$.pipe(
            combineLatest(this.movingShape$),
            tap(([action, shape]) => this.performAction(shape, action))
        ).subscribe(
            ([, shape]) =>  {
                this.tetrisGraphics.clearDraw();
                this.tetrisGraphics.drawBlocks(this.tetrisGrid.getAllBlocks());
                this.tetrisGraphics.drawBlocks(shape.blocks);
            }
        );

        Observable.interval(200).pipe(
            combineLatest(this.movingShape$),
            tap(([, shape]) => this.performAction(shape, TetrisActionName.DOWN))
        ).subscribe(
            ([, shape]) =>  {
                this.tetrisGraphics.clearDraw();
                this.tetrisGraphics.drawBlocks(this.tetrisGrid.getAllBlocks());
                this.tetrisGraphics.drawBlocks(shape.blocks);
            }
        );

    }

    private collisionDetected(shape: TetrisShape, move: (shape:TetrisShape) => (void)): boolean {
        let clonedShape: TetrisShape = shape.clone;
        clonedShape.performMove(move);
        return this.tetrisGrid.collisionDetection(clonedShape.blocks);
    }

    // private moveDown(): Observable<boolean> {
    //     let cloneShape: TetrisShape = this.movingShape.clone().moveDown();
    //     if (this.tetrisGrid.blockCollisionDetection(cloneShape.blocks)) {
    //         this.tetrisGrid.giveBlocksToGrid(this.movingShape.blocks);
    //         let numOfFullRows: number[] = this.tetrisGrid.detectFullRows();
    //         this.updateScore(numOfFullRows);
    //         numOfFullRows.forEach((value) => this.tetrisGrid.removeRow(value));
    //         this.movingShape = getRandomTetrisShape();
    //     }
    //     else if (this.tetrisGrid.collisionDetection(cloneShape.blocks)) {
    //         this.movingShape.moveDown();
    //     }
    // }

    // private rotate(): Observable<boolean> {
    //     return this.movingShape$.pipe(
    //         mergeMap(( shape ) => shape.clone$),
    //         mergeMap(( clonedShape ) => clonedShape.rotate$),
    //         mergeMap(( clonedShape ) => clonedShape.blocks$),
    //         filter(( blocks ) => this.tetrisGrid.noCollisionDetected(blocks)),
    //         combineLatest(this.movingShape$),
    //         mergeMap(( [ blocks, shape ] ) => shape.rotate$),
    //         map(() => true)
    //     );
    // }

    private performAction(shape: TetrisShape, action: TetrisActionName) {

        switch (action) {
            case TetrisActionName.LEFT:
                if(!this.collisionDetected(shape, TetrisShape.moveLeft)){
                    shape.performMove(TetrisShape.moveLeft);
                }
                break;
            case TetrisActionName.RIGHT:
                if(!this.collisionDetected(shape, TetrisShape.moveRight)){
                    shape.performMove(TetrisShape.moveRight);
                }
                break;
            case TetrisActionName.DOWN:
                if(!this.collisionDetected(shape, TetrisShape.moveDown)){
                    shape.performMove(TetrisShape.moveDown);
                }
                break;
            case TetrisActionName.ROTATE:
                if(!this.collisionDetected(shape, shape.rotate)){
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
