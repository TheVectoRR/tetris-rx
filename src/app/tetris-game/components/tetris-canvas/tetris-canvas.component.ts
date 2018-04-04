import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
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
export class TetrisCanvasComponent implements OnInit, AfterViewInit {

    @ViewChild('tetrisCanvas') tetrisCanvas;

    @Output() endGameEvent: EventEmitter<void> = new EventEmitter();
    @Output() linesCompletedEvent: EventEmitter<number> = new EventEmitter();

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

    public ngOnInit(): void {
      this.tetrisGameControllerService.linesCompleted$
        .subscribe((numOfCompletedLines) => this.linesCompletedEvent.emit(numOfCompletedLines));

      this.tetrisGameControllerService.gameSubject$.subscribe(
        (a) => {},
        () => {},
        () => this.endGameEvent.emit()
        );
    }

}
