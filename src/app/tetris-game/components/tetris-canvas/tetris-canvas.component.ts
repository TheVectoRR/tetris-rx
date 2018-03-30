import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TetrisGameController } from '../../core-game/tetris-game.controller';
import { ConfigurationProviderService } from '../../services/configuration-provider.service';
import {TetrisCanvasGraphics} from '../../core-game/tetris-graphics';

@Component({
  selector: 'tetris-canvas',
  templateUrl: './tetris-canvas.component.html',
  styleUrls: [ './tetris-canvas.component.css' ]
})
export class TetrisCanvasComponent implements AfterViewInit {

    @ViewChild('tetrisCanvas') tetrisCanvas;
    public tetrisCanvasWidth: number;
    public tetrisCanvasHeight: number;

    private tetrisGameController: TetrisGameController;

    constructor(
        private readonly configuration: ConfigurationProviderService
    ) {
        this.tetrisCanvasWidth = configuration.pixelsWidth;
        this.tetrisCanvasHeight = configuration.pixelsHeight;
    }

    public ngAfterViewInit() {
        const canvas = this.tetrisCanvas.nativeElement;
        const ctx = canvas.getContext('2d');

        const tetrisGraphics = new TetrisCanvasGraphics(
              ctx,
            this.configuration.pixelsWidth / this.configuration.blocksWidth,
            this.configuration.pixelsHeight / this.configuration.blocksHeight,
            this.configuration.pixelsWidth,
            this.configuration.pixelsHeight
        );
        this.tetrisGameController = new TetrisGameController(
            this.configuration.blocksWidth,
            this.configuration.blocksHeight,
            tetrisGraphics
        );
        this.tetrisGameController.gameLoop();
    }

}
