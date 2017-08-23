import {TetrisBlock} from "./TetrisModels";
export class TetrisGameField{

    private _tetrisBlocks:TetrisBlock[] = [];

    constructor(){
        this._tetrisBlocks.push({xPos:0, yPos:19}, {xPos:1, yPos:19}, {xPos:5, yPos:19}, {xPos:9, yPos:19})
    }


    get tetrisBlocks(): TetrisBlock[] {
        return this._tetrisBlocks;
    }
}