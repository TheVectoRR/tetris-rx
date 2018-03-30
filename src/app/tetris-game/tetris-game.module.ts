import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TetrisCanvasComponent } from './components/tetris-canvas/tetris-canvas.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TetrisCanvasComponent
  ],
  exports: [
    TetrisCanvasComponent
  ]
})
export class TetrisGameModule { }
