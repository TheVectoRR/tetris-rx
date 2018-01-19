import { getTetrisShape$, TetrisBlock, TetrisShapeName } from '../TetrisUtils';
import { Observable } from 'rxjs/Observable';
import { map, combineLatest } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

export abstract class TetrisShape {

    protected _blocks: TetrisBlock[] = [];
    protected rotatePosition: number = 0;

    constructor(readonly tetrisShapeName: TetrisShapeName) {
    }

    public get blocks$(): Observable<TetrisBlock[]> {
        return Observable.of(this._blocks);
    }

    public performMove$(move: (b:TetrisBlock) => (void)): Observable<TetrisShape> {
        this._blocks.map(block => move(block));
        return Observable.of(this);
    }

    public get clone$(): Observable<TetrisShape> {
        return getTetrisShape$(this.tetrisShapeName).
            do((shape) => shape.rotatePosition = this.rotatePosition).pipe(
                combineLatest(this.cloneOfBlocks$),
                map(([shape, clonedBlocks]) => {
                    if (shape) {
                        shape._blocks = clonedBlocks
                    }
                    return shape;
                })
        );
    }

    protected get cloneOfBlocks$(): Observable<TetrisBlock[]> {
        let blocks: TetrisBlock[] = [];
        for (let block of this._blocks) {
            blocks.push({
                xPos: block.xPos,
                yPos: block.yPos,
                color: block.color
            });
        }
        return Observable.of(blocks);
    }

    public abstract get rotate$(): Observable<this>;
}