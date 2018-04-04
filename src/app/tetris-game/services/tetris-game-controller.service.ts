import { TetrisGrid } from '../core-game/game-objects/tetris-grid';
import { TetrisActionName } from '../core-game/game-objects/tetris-utils';
import { keyboardObservable$ } from '../core-game/game-observers/keyboard-event.observable';
import { TetrisShape } from '../core-game/game-objects/shape-objects/tetris-shape';
import { getRandomTetrisShape } from '../core-game/game-observers/random-shape-generator';
import { Observable } from 'rxjs/Observable';
import { combineLatest, map, tap } from 'rxjs/operators';
import 'rxjs/add/observable/interval';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { TetrisCanvasGraphicsService } from './tetris-graphics-canvas.service';
import {Injectable} from '@angular/core';
import {ConfigurationProviderService} from './configuration-provider.service';

@Injectable()
export class TetrisGameControllerService {

    private tetrisGrid: TetrisGrid;
    private tetrisShapeSubject: Subject<TetrisShape> = new Subject();
    private linesCompletedSubject: Subject<number> = new Subject();
    private subscriptions: Subscription[] = [];

    constructor(
        private readonly configuration: ConfigurationProviderService,
        private readonly tetrisGraphics: TetrisCanvasGraphicsService
    ) {
        this.tetrisGrid = new TetrisGrid(configuration.blocksWidth, configuration.blocksHeight);
        this.tetrisGraphics.drawBlocks(this.tetrisGrid.getAllBlocks());
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

    public get gameSubject$(): Observable<TetrisShape> {
        return this.tetrisShapeSubject.asObservable();
    }

    public get linesCompleted$(): Observable<number> {
        return this.linesCompletedSubject.asObservable();
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
                    this.tetrisGraphics.drawBlocks(shape.blocks);
                    this.tetrisShapeSubject.complete();
                    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
                } else {
                    this.tetrisGrid.giveBlocksToGrid(shape.blocks);
                    const numOfFullRows: number[] = this.tetrisGrid.detectFullRows();
                    this.linesCompletedSubject.next(numOfFullRows.length);
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
}
