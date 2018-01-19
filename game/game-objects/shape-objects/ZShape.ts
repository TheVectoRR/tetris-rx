import { TetrisShape } from "./TetrisShape";
import { TetrisShapeName } from "../TetrisUtils";
import { Observable } from 'rxjs/Observable';

const SHAPE_COLOR = 'purple';

export class ZShape extends TetrisShape {

    constructor() {
        super(TetrisShapeName.ZSHAPE);
        this._blocks.push(
            { xPos: 5, yPos: -3, color: SHAPE_COLOR },
            { xPos: 5, yPos: -2, color: SHAPE_COLOR },
            { xPos: 4, yPos: -2, color: SHAPE_COLOR },
            { xPos: 4, yPos: -1, color: SHAPE_COLOR }
        )
    }

    public get rotate$(): Observable<this>  {
        ZShape.rotateShape(this);
        this.rotatePosition = (this.rotatePosition + 1) % 2;
        return Observable.of(this);
    }

    private static rotateShape(shape: ZShape): void {
        switch (shape.rotatePosition) {
            case 0:
                shape._blocks[ 0 ].xPos -= 1;
                shape._blocks[ 0 ].yPos += 1;

                shape._blocks[ 2 ].xPos += 1;
                shape._blocks[ 2 ].yPos += 1;

                shape._blocks[ 3 ].xPos += 2;
                break;
            case 1:
                shape._blocks[ 0 ].xPos += 1;
                shape._blocks[ 0 ].yPos -= 1;

                shape._blocks[ 2 ].xPos -= 1;
                shape._blocks[ 2 ].yPos -= 1;

                shape._blocks[ 3 ].xPos -= 2;
                break;
        }
    }

}