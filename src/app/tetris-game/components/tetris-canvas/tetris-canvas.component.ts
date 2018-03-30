import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TetrisGameController } from '../../core-game/tetris-game.controller';
import { TetrisCanvasGraphics } from '../../core-game/tetris-graphics';

const TETRIS_BLOCKS_WIDTH = 10;
const TETRIS_BLOCKS_HEIGHT = 20;
const TETRIS_WIDTH = 350;
const TETRIS_HEIGHT = 700;

@Component({
  selector: 'tetris-canvas',
  templateUrl: './tetris-canvas.component.html',
  styleUrls: ['./tetris-canvas.component.css']
})
export class TetrisCanvasComponent implements AfterViewInit {

  @ViewChild('tetrisCanvas') tetrisCanvas;
  public tetrisCanvasWidth = TETRIS_WIDTH;
  public tetrisCanvasHeight = TETRIS_HEIGHT;

  private tetrisGameController: TetrisGameController;

  constructor() { }

  public ngAfterViewInit() {
    const canvas = this.tetrisCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    const tetrisGraphics = new TetrisCanvasGraphics(
      ctx, TETRIS_WIDTH / TETRIS_BLOCKS_WIDTH, TETRIS_HEIGHT / TETRIS_BLOCKS_HEIGHT, TETRIS_WIDTH, TETRIS_HEIGHT);
    this.tetrisGameController = new TetrisGameController(TETRIS_BLOCKS_WIDTH, TETRIS_BLOCKS_HEIGHT, tetrisGraphics);
    this.tetrisGameController.gameLoop();
  }

}
