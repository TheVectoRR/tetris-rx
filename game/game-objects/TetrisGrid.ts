import {TetrisBlock} from "./TetrisModels";
export class TetrisGrid {

    private _blocks: TetrisBlock[] = [];

    constructor() {
        this._blocks.push(
            {xPos: 0, yPos: 19, color: 'red'},
            {xPos: 1, yPos: 19, color: 'blue'},
            {xPos: 5, yPos: 19, color: 'red'},
            {xPos: 9, yPos: 19, color: 'red'}
        );
    }

    get blocks(): TetrisBlock[] {
        return this._blocks;
    }

    public isBlockAtPosition(x:number, y: number): boolean{
        for(let block of this.blocks){
            if(block.xPos === x && block.yPos === y){
                return true;
            }
        }
        return false;
    }
}