import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ConfigurationProviderService } from '../../services/configuration-provider.service';
import { TetrisGameControllerService } from '../../services/tetris-game-controller.service';
import { TetrisCanvasGraphicsService } from '../../services/tetris-graphics-canvas.service';

@Component({
  selector: 'tetris-canvas',
  templateUrl: './tetris-canvas.component.html',
  styleUrls: [ './tetris-canvas.component.css' ],
  providers: [
    TetrisGameControllerService,
    TetrisCanvasGraphicsService
  ]
})
export class TetrisCanvasComponent implements AfterViewInit {

    @ViewChild('tetrisCanvas') tetrisCanvas;
    public tetrisCanvasWidth: number;
    public tetrisCanvasHeight: number;

    constructor(
        private readonly configuration: ConfigurationProviderService,
        private readonly tetrisCanvasGraphicsService: TetrisCanvasGraphicsService,
        private readonly tetrisGameControllerService: TetrisGameControllerService
    ) {
        this.tetrisCanvasWidth = configuration.pixelsWidth;
        this.tetrisCanvasHeight = configuration.pixelsHeight;
    }

    public ngAfterViewInit() {
        const canvas = this.tetrisCanvas.nativeElement;

        this.tetrisCanvasGraphicsService.canvasContext = canvas.getContext('2d');
        this.tetrisGameControllerService.gameLoop();
    }

}
