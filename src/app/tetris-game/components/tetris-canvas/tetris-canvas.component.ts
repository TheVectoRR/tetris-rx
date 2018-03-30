import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TetrisGameController } from '../../core-game/tetris-game.controller';
import { ConfigurationProviderService } from '../../services/configuration-provider.service';
import { TetrisCanvasGraphicsService } from '../../services/tetris-graphics-canvas.service';

@Component({
  selector: 'tetris-canvas',
  templateUrl: './tetris-canvas.component.html',
  styleUrls: [ './tetris-canvas.component.css' ],
  providers: [ TetrisCanvasGraphicsService ]
})
export class TetrisCanvasComponent implements AfterViewInit {

    @ViewChild('tetrisCanvas') tetrisCanvas;
    public tetrisCanvasWidth: number;
    public tetrisCanvasHeight: number;

    private tetrisGameController: TetrisGameController;

    constructor(
        private readonly configuration: ConfigurationProviderService,
        private readonly tetrisCanvasGraphicsService: TetrisCanvasGraphicsService
    ) {
        this.tetrisCanvasWidth = configuration.pixelsWidth;
        this.tetrisCanvasHeight = configuration.pixelsHeight;
    }

    public ngAfterViewInit() {
        const canvas = this.tetrisCanvas.nativeElement;
        const ctx = canvas.getContext('2d');

        this.tetrisCanvasGraphicsService.canvasContext = ctx;

        this.tetrisGameController = new TetrisGameController(
            this.configuration.blocksWidth,
            this.configuration.blocksHeight,
            this.tetrisCanvasGraphicsService
        );
        this.tetrisGameController.gameLoop();
    }

}
