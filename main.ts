import {TetrisGameController} from "./game/TetrisGameController";

const CANVAS_DIV_ID: string = 'tetrisCanvas';
const TETRIS_WIDTH: number = 350;
const TETRIS_HEIGHT: number = 700;


function initGameElements() {
    let tetrisDivElement: HTMLElement = document.getElementById("tetris-game-div")!;
    let tetrisCanvasDiv: HTMLElement = document.createElement("tetris-gamefield-div");
    tetrisCanvasDiv.innerHTML = `
        <canvas id="${CANVAS_DIV_ID}" width="${TETRIS_WIDTH}" height="${TETRIS_HEIGHT}" style="border:1px solid #000000;">
        </canvas>`;
    tetrisDivElement.appendChild(tetrisCanvasDiv);
}

function initGame() {
    let gameController: TetrisGameController = new TetrisGameController(TETRIS_WIDTH, TETRIS_HEIGHT, CANVAS_DIV_ID);
    gameController.initDrawGrid();
    gameController.observeKeyboard();
}

initGameElements();
initGame();


