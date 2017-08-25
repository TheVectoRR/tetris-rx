import {TetrisBlock} from "./TetrisModels";
import {TetrisShape} from "./TetrisShape";
import {LShape} from "./LShape";
export class TetrisGrid {

    private _blocks: TetrisBlock[] = [];
    private _movingShape: TetrisShape;

    constructor(private blocksWide:number, private blocksHigh:number) {
        this._blocks.push(
            {xPos: 0, yPos: 19, color: 'red'},
            {xPos: 1, yPos: 19, color: 'blue'},
            {xPos: 5, yPos: 19, color: 'red'},
            {xPos: 9, yPos: 19, color: 'red'}
        );

        this._movingShape = new LShape();
    }

    get blocks(): TetrisBlock[] {
        return this._blocks;
    }

    get movingShape(): TetrisShape {
        return this._movingShape;
    }

    public moveRight(): void {
        if(this.movingShape.blocks.filter((block) =>
            (block.xPos >= this.blocksWide-1) || this.isBlockAtPosition(block.xPos +1, block.yPos)).length === 0){
            this.movingShape.moveRight();
        }
    }

    public moveLeft(): void {
        if(this.movingShape.blocks.filter((block) =>
            (block.xPos <= 0) || this.isBlockAtPosition(block.xPos -1, block.yPos)).length === 0){
            this.movingShape.moveLeftt();
        }
    }

    public moveDown(): void {
        if(this.movingShape.blocks.filter((block) =>
            (block.yPos >= this.blocksHigh-1) || this.isBlockAtPosition(block.xPos, block.yPos+1)).length === 0){
            this.movingShape.moveDown();
        }
    }

    public rotate() {
        // TODO: collision detection for rotate
        this.movingShape.rotate();
    }

    private isBlockAtPosition(x:number, y: number): boolean{
        for(let block of this.blocks){
            if(block.xPos === x && block.yPos === y){
                return true;
            }
        }
        return false;
    }
}