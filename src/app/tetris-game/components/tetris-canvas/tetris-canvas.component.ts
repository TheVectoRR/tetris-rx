import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { ConfigurationProviderService } from '../../services/configuration-provider.service';
import { TetrisGameControllerService } from '../../services/tetris-game-controller.service';
import { TetrisCanvasGraphicsService } from '../../services/tetris-graphics-canvas.service';
import { GameTimerService } from '../../services/game-timer.service';

@Component({
  selector: 'tetris-canvas',
  templateUrl: './tetris-canvas.component.html',
  styleUrls: [ './tetris-canvas.component.css' ],
  providers: [
    TetrisGameControllerService,
    TetrisCanvasGraphicsService,
    GameTimerService
  ]
})
export class TetrisCanvasComponent implements OnInit, AfterViewInit {

    @ViewChild('tetrisCanvas', {static: false}) tetrisCanvas;

    @Output() endGameEvent: EventEmitter<void> = new EventEmitter();
    @Output() linesCompletedEvent: EventEmitter<number> = new EventEmitter();

    public tetrisCanvasWidth: number;
    public tetrisCanvasHeight: number;

    @Input()
    public set speedLevel(level: number) {
        if (0 <= level && level < 10) {
            this.tetrisGameControllerService.timer.setInterval(500 - level * 50);
        } else {
            console.log('level should be between 0 and 9');
        }
    }

    constructor(
        private readonly configuration: ConfigurationProviderService,
        private readonly tetrisCanvasGraphicsService: TetrisCanvasGraphicsService,
        private readonly tetrisGameControllerService: TetrisGameControllerService
    ) {
        this.tetrisCanvasWidth = configuration.pixelsWidth;
        this.tetrisCanvasHeight = configuration.pixelsHeight;
    }

    public ngOnInit(): void {
        this.tetrisGameControllerService.linesCompleted$
            .subscribe((numOfCompletedLines) => this.linesCompletedEvent.emit(numOfCompletedLines));

        this.tetrisGameControllerService.gameSubject$.subscribe(
          () => {},
          () => {},
          () => this.endGameEvent.emit()
        );
    }

    public ngAfterViewInit() {
        const canvas = this.tetrisCanvas.nativeElement;
        this.tetrisCanvasGraphicsService.canvasContext = canvas.getContext('2d');

        this.tetrisGameControllerService.gameLoop();
    }
}
