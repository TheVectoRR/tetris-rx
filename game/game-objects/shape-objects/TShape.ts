import { TetrisShape } from './TetrisShape';
import { TetrisShapeName } from '../TetrisUtils';
import { Observable } from 'rxjs/Observable';

const SHAPE_COLOR = 'grey';

export class TShape extends TetrisShape {

    constructor() {
        super(TetrisShapeName.TSHAPE);
        this._blocks.push(
            { xPos: 4, yPos: -3, color: SHAPE_COLOR },
            { xPos: 4, yPos: -2, color: SHAPE_COLOR },
            { xPos: 4, yPos: -1, color: SHAPE_COLOR },
            { xPos: 5, yPos: -2, color: SHAPE_COLOR }
        )
    }

    public get rotate$(): Observable<this>  {
        TShape.rotateShape(this);
        this.rotatePosition = (this.rotatePosition + 1) % 4;
        return Observable.of(this);
    }

    private static rotateShape(shape: TShape): void {
        switch (shape.rotatePosition) {
            case 0:
                shape._blocks[ 0 ].xPos += 1;
                shape._blocks[ 0 ].yPos += 1;

                shape._blocks[ 2 ].xPos -= 1;
                shape._blocks[ 2 ].yPos -= 1;

                shape._blocks[ 3 ].xPos -= 1;
                shape._blocks[ 3 ].yPos += 1;
                break;
            case 1:
                shape._blocks[ 0 ].xPos -= 1;
                shape._blocks[ 0 ].yPos += 1;

                shape._blocks[ 2 ].xPos += 1;
                shape._blocks[ 2 ].yPos -= 1;

                shape._blocks[ 3 ].xPos -= 1;
                shape._blocks[ 3 ].yPos -= 1;
                break;
            case 2:
                shape._blocks[ 0 ].xPos -= 1;
                shape._blocks[ 0 ].yPos -= 1;

                shape._blocks[ 2 ].xPos += 1;
                shape._blocks[ 2 ].yPos += 1;

                shape._blocks[ 3 ].xPos += 1;
                shape._blocks[ 3 ].yPos -= 1;
                break;
            case 3:
                shape._blocks[ 0 ].xPos += 1;
                shape._blocks[ 0 ].yPos -= 1;

                shape._blocks[ 2 ].xPos -= 1;
                shape._blocks[ 2 ].yPos += 1;

                shape._blocks[ 3 ].xPos += 1;
                shape._blocks[ 3 ].yPos += 1;
                break;
        }
    }

}