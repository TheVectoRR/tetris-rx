import { TetrisBlock } from '../core-game/game-objects/tetris-utils';
import {Injectable} from '@angular/core';
import {ConfigurationProviderService} from './configuration-provider.service';

@Injectable()
export class TetrisCanvasGraphicsService {

    private ctx: CanvasRenderingContext2D;

    constructor(
        private readonly configuration: ConfigurationProviderService
    ) {
    }

    public set canvasContext(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    public drawBlocks(blocks: TetrisBlock[]): void {
        for (const block of blocks) {
            this.drawBlock(block);
        }
    }

    public clearDraw() {
        this.ctx.clearRect(
            0,
            0,
            this.configuration.pixelsWidth,
            this.configuration.pixelsHeight
        );
    }

    private drawBlock(block: TetrisBlock) {
        this.ctx.beginPath();
        this.ctx.rect(
          block.xPos * this.configuration.pixelsWidth / this.configuration.blocksWidth,
          block.yPos * this.configuration.pixelsHeight / this.configuration.blocksHeight,
          this.configuration.pixelsWidth / this.configuration.blocksWidth,
          this.configuration.pixelsHeight / this.configuration.blocksHeight
        );
        this.ctx.fillStyle = block.color;
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = 'black';
        this.ctx.fill();
        this.ctx.stroke();
    }
}
