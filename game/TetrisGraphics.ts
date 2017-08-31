import {TetrisBlock} from "./game-objects/TetrisUtils";

export interface TetrisGraphics{
    drawBlocks(blocks:TetrisBlock[]):void;
    clearDraw():void;
}

export class TetrisCanvasGraphics implements TetrisGraphics{

    constructor(private ctx: CanvasRenderingContext2D,
                private pixelWidth: number,
                private pixelHeight: number,
                private playFieldWidth: number,
                private playFieldHeigth: number) {
    }

    public drawBlocks(blocks: TetrisBlock[]): void {
        for (let block of blocks) {
            this.drawBlock(block)
        }
    }

    public clearDraw(){
        this.ctx.clearRect(0, 0, this.playFieldWidth, this.playFieldHeigth);
    }

    private drawBlock(block: TetrisBlock) {
        this.ctx.beginPath();
        this.ctx.rect(block.xPos * this.pixelWidth, block.yPos * this.pixelHeight, this.pixelHeight, this.pixelWidth);
        this.ctx.fillStyle = block.color;
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = "black";
        this.ctx.fill();
        this.ctx.stroke();
    }
}