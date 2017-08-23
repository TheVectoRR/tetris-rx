import {TetrisGameField} from "./game-objects/TetrisGameField";

const TETRIS_BLOCKS_WIDTH:number = 10;
const TETRIS_BLOCKS_HEIGHT:number = 20;

export class TetrisGameController {

    private tetrisGameField:TetrisGameField;

    constructor(readonly width: number,
                readonly height: number,
                readonly canvasId: string) {
        this.tetrisGameField = new TetrisGameField();
    }

    public drawBoard():void{
        let canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById(this.canvasId);
        let ctx:CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext("2d");
        let pixelWidth:number = this.width/TETRIS_BLOCKS_WIDTH;
        let pixelHeight:number = this.height/TETRIS_BLOCKS_HEIGHT;
        for(let block of this.tetrisGameField.tetrisBlocks){
            ctx.beginPath();
            ctx.rect(block.xPos*pixelWidth, block.yPos*pixelHeight, pixelHeight, pixelWidth);
            ctx.fillStyle = "red";
            ctx.lineWidth=4;
            ctx.strokeStyle="black";
            ctx.fill();
            ctx.stroke();
        }

    }
}
