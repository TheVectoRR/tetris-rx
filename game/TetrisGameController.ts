import { TetrisGrid } from "./game-objects/TetrisGrid";
import { moveDown, moveLeft, moveRight, TetrisActionName, TetrisBlock } from "./game-objects/TetrisUtils";
import { keyboardObservable$ } from "./game-observers/KeyboardEventObserver";
import { TetrisGraphics } from "./TetrisGraphics";
import { TetrisShape } from "./game-objects/shape-objects/TetrisShape";
import { getRandomTetrisShape$ } from "./game-observers/RandomShapeGeneratorStreamObservable";
import { Observable } from  "rxjs/Observable";
import { combineLatest, filter, mergeMap, map, startWith } from 'rxjs/operators';
import 'rxjs/add/observable/interval';
import 'rxjs/Operators/first';

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

    private performMove(move: (b:TetrisBlock) => (void)): Observable<boolean> {
        return this.movingShape$.pipe(
            mergeMap(( shape ) => shape.clone$),
            mergeMap(( clonedShape ) => clonedShape.performMove$(move)),
            mergeMap(( clonedShape ) => clonedShape.blocks$),
            filter(( blocks ) => this.tetrisGrid.noCollisionDetected(blocks)),
            combineLatest(this.movingShape$),
            mergeMap(( [ blocks, shape ] ) => shape.performMove$(move)),
            map(() => true)
        );
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

    private rotate(): Observable<boolean> {
        return this.movingShape$.pipe(
            mergeMap(( shape ) => shape.clone$),
            mergeMap(( clonedShape ) => clonedShape.rotate$),
            mergeMap(( clonedShape ) => clonedShape.blocks$),
            filter(( blocks ) => this.tetrisGrid.noCollisionDetected(blocks)),
            combineLatest(this.movingShape$),
            mergeMap(( [ blocks, shape ] ) => shape.rotate$),
            map(() => true)
        );
    }

    // TODO: probably still need to subscribe to the action method
    private performAction(action: TetrisActionName) {

        let moveDone$ = Observable.of(true);

        this.tetrisGraphics.clearDraw();

        switch (action) {
            case TetrisActionName.LEFT:
                moveDone$ = this.performMove(moveLeft);
                break;
            case TetrisActionName.RIGHT:
                moveDone$ = this.performMove(moveRight);
                break;
            case TetrisActionName.DOWN:
                moveDone$ = this.performMove(moveDown).pipe(
                    filter((moveCompleted) => moveCompleted),
                    // TODO
                );
                break;
            case TetrisActionName.ROTATE:
                moveDone$ = this.rotate();
                break;
        }

        moveDone$.subscribe((move) => console.log(move));

        this.tetrisGraphics.drawBlocks(this.tetrisGrid.getAllBlocks());
        this.movingShape$.pipe(
            mergeMap((shape) => shape.blocks$)
        ).subscribe((blocks) => this.tetrisGraphics.drawBlocks(blocks));
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
