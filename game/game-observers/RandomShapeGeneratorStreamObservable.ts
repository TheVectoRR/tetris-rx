import {TetrisShape} from "../game-objects/shape-objects/TetrisShape";
import {TetrisShapeName} from "../game-objects/TetrisModels";
import {JShape} from "../game-objects/shape-objects/JShape";
import {LShape} from "../game-objects/shape-objects/LShape";
import {IShape} from "../game-objects/shape-objects/IShape";
import {OShape} from "../game-objects/shape-objects/OShape";
import {SShape} from "../game-objects/shape-objects/SShape";
import {TShape} from "../game-objects/shape-objects/TShape";
import {ZShape} from "../game-objects/shape-objects/ZShape";

// TODO no observable stream of shapes yet
export function getRandomTetrisShape(): TetrisShape{
    let randomValue:number = Math.floor(Math.random() * TetrisShapeName.NUMBER_OF_SHAPES);
    return getTetrisShape(randomValue)!;
}

function getTetrisShape(index:TetrisShapeName): TetrisShape|undefined{
    switch(index){
        case TetrisShapeName.ISHAPE:
            return new IShape();
        case TetrisShapeName.JSHAPE:
            return new JShape();
        case TetrisShapeName.LSHAPE:
            return new LShape();
        case TetrisShapeName.OSHAPE:
            return new OShape();
        case TetrisShapeName.SSHAPE:
            return new SShape();
        case TetrisShapeName.TSHAPE:
            return new TShape();
        case TetrisShapeName.ZSHAPE:
            return new ZShape();
        default:
            console.error('undefined tetris shape');
            return undefined;

    }
}