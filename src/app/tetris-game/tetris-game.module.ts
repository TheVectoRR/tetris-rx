import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TetrisCanvasComponent } from './components/tetris-canvas/tetris-canvas.component';
import { ConfigurationProviderService } from './services/configuration-provider.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TetrisCanvasComponent
    ],
    providers: [
        ConfigurationProviderService
    ],
    exports: [
        TetrisCanvasComponent
    ]
})
export class TetrisGameModule { }
