import {TetrisGrid} from "./game-objects/TetrisGrid";
import {TetrisAction, TetrisBlock} from "./game-objects/TetrisModels";
import {keyboardObservable} from "./game-observers/KeyboardEventObserver";

const TETRIS_BLOCKS_WIDTH: number = 10;
const TETRIS_BLOCKS_HEIGHT: number = 20;

export class TetrisGameController {

    private tetrisGrid: TetrisGrid;
    private ctx: CanvasRenderingContext2D;
    private pixelWidth: number;
    private pixelHeight: number;

    constructor(readonly width: number,
                readonly height: number,
                readonly canvasId: string) {
        this.tetrisGrid = new TetrisGrid(TETRIS_BLOCKS_WIDTH, TETRIS_BLOCKS_HEIGHT);
        this.pixelWidth = this.width / TETRIS_BLOCKS_WIDTH;
        this.pixelHeight = this.height / TETRIS_BLOCKS_HEIGHT;
    }

    public initDrawGrid(): void {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById(this.canvasId);
        this.ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
        this.redraw();
    }

    private redraw(): void {
        this.ctx.clearRect(0, 0, 350, 700);
        for (let block of this.tetrisGrid.blocks) {
            this.drawBlock(block)
        }
        for (let block of this.tetrisGrid.movingShape.blocks) {
            this.drawBlock(block)
        }
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

    public observeKeyboard() {

        keyboardObservable.subscribe(
            (value: TetrisAction) => {
                if (value === TetrisAction.DOWN) {
                    this.tetrisGrid.moveDown();
                    this.redraw();
                } else if (value === TetrisAction.LEFT) {
                    this.tetrisGrid.moveLeft();
                    this.redraw();
                } else if (value === TetrisAction.RIGHT) {
                    this.tetrisGrid.moveRight();
                    this.redraw();
                }
            },
            e => console.log(`error: ${e}`),
            () => console.log('complete')
        );
    }
}
