import { TetrisShape } from './TetrisShape';
import { TetrisShapeName } from '../TetrisUtils';
import { Observable } from 'rxjs/Observable';

const SHAPE_COLOR = 'cyan';

export class IShape extends TetrisShape {

    constructor() {
        super(TetrisShapeName.ISHAPE);
        this._blocks.push(
            { xPos: 5, yPos: -4, color: SHAPE_COLOR },
            { xPos: 5, yPos: -3, color: SHAPE_COLOR },
            { xPos: 5, yPos: -2, color: SHAPE_COLOR },
            { xPos: 5, yPos: -1, color: SHAPE_COLOR }
        )
    }

    public get rotate$(): Observable<this>  {
        IShape.rotateShape(this);
        this.rotatePosition = (this.rotatePosition + 1) % 2;
        return Observable.of(this);
    }

    private static rotateShape(shape: IShape): void {
        switch (shape.rotatePosition) {
            case 0:
                shape._blocks[ 0 ].xPos -= 2;
                shape._blocks[ 0 ].yPos += 2;

                shape._blocks[ 1 ].xPos -= 1;
                shape._blocks[ 1 ].yPos += 1;

                shape._blocks[ 3 ].xPos += 1;
                shape._blocks[ 3 ].yPos -= 1;
                break;
            case 1:
                shape._blocks[ 0 ].xPos += 2;
                shape._blocks[ 0 ].yPos -= 2;

                shape._blocks[ 1 ].xPos += 1;
                shape._blocks[ 1 ].yPos -= 1;

                shape._blocks[ 3 ].xPos -= 1;
                shape._blocks[ 3 ].yPos += 1;
                break;
        }
    }

}