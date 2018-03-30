import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TetrisGameController } from '../TetrisGameController';
import { TetrisCanvasGraphics } from '../TetrisGraphics';

const TETRIS_BLOCKS_WIDTH = 10;
const TETRIS_BLOCKS_HEIGHT = 20;
const TETRIS_WIDTH = 350;
const TETRIS_HEIGHT = 700;

@Component({
  selector: 'app-tetris-component',
  templateUrl: './tetris-component.component.html',
  styleUrls: ['./tetris-component.component.css']
})
export class TetrisComponentComponent implements AfterViewInit {

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
