export class TetrisGameField {

    constructor(readonly height: number,
                readonly width: number,
                readonly tetrisGameFieldDivElement: HTMLElement) {
        this.tetrisGameFieldDivElement.innerHTML = `
    <canvas id="tetrisCanvas" width="${this.width}" height="${this.height}" style="border:1px solid #000000;">
    </canvas>`;
    }

    public startGame():void{
        this.tetrisGameFieldDivElement.innerHTML += "game started...";
    }
}
