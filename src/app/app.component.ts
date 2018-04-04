import { Component } from '@angular/core';

@Component({
  selector: 'tetris-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    public gameisRunning = true;
    public numOfCompletedLines = 0;

    public updateScore(completedLines: number) {
        this.numOfCompletedLines += completedLines;
    }

    public endGame(): void {
        this.gameisRunning = false;
    }

}
