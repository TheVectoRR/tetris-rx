import {TetrisGrid} from "./game-objects/TetrisGrid";
import {TetrisBlock} from "./game-objects/TetrisModels";

const TETRIS_BLOCKS_WIDTH:number = 10;
const TETRIS_BLOCKS_HEIGHT:number = 20;

export class TetrisGameController {

    private tetrisGrid:TetrisGrid;

    constructor(readonly width: number,
                readonly height: number,
                readonly canvasId: string) {
        this.tetrisGrid = new TetrisGrid(TETRIS_BLOCKS_WIDTH, TETRIS_BLOCKS_HEIGHT);
    }

    public drawGrid():void{
        let canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById(this.canvasId);
        let ctx:CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext("2d");
        let pixelWidth:number = this.width/TETRIS_BLOCKS_WIDTH;
        let pixelHeight:number = this.height/TETRIS_BLOCKS_HEIGHT;

        this.tetrisGrid.moveDown();
        this.tetrisGrid.moveDown();
        this.tetrisGrid.moveDown();
        this.tetrisGrid.moveDown();
        this.tetrisGrid.moveDown();
        this.tetrisGrid.moveDown();
        this.tetrisGrid.moveDown();
        this.tetrisGrid.moveDown();
        this.tetrisGrid.moveDown();
        this.tetrisGrid.moveDown();
        this.tetrisGrid.moveDown();
        this.tetrisGrid.moveDown();
        this.tetrisGrid.moveDown();
        this.tetrisGrid.moveDown();
        this.tetrisGrid.moveDown();
        this.tetrisGrid.moveDown();
        this.tetrisGrid.moveDown();
        this.tetrisGrid.moveDown();
        this.tetrisGrid.moveDown();



        for(let block of this.tetrisGrid.blocks){
            this.drawBlock(ctx, block, pixelWidth, pixelHeight)
        }
        for(let block of this.tetrisGrid.movingShape.blocks){
            this.drawBlock(ctx, block, pixelWidth, pixelHeight)
        }
    }

    private drawBlock(ctx:CanvasRenderingContext2D, block: TetrisBlock, pixelWidth:number, pixelHeight: number){
        ctx.beginPath();
        ctx.rect(block.xPos*pixelWidth, block.yPos*pixelHeight, pixelHeight, pixelWidth);
        ctx.fillStyle = block.color;
        ctx.lineWidth=4;
        ctx.strokeStyle="black";
        ctx.fill();
        ctx.stroke();
    }
}
