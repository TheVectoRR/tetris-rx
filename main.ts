import {TetrisGameController} from "./game/TetrisGameController";
import {TetrisCanvasGraphics, TetrisGraphics} from "./game/TetrisGraphics";

const CANVAS_DIV_ID: string = 'tetrisCanvas';
const TETRIS_BLOCKS_WIDTH: number = 10;
const TETRIS_BLOCKS_HEIGHT: number = 20;
const TETRIS_WIDTH: number = 350;
const TETRIS_HEIGHT: number = 700;


function initCanvasElements(): CanvasRenderingContext2D {
    let tetrisCanvasDiv: HTMLElement = document.createElement("tetris-gamefield-div");
    tetrisCanvasDiv.innerHTML = `
        <canvas id="${CANVAS_DIV_ID}" width="${TETRIS_WIDTH}" height="${TETRIS_HEIGHT}" style="border:1px solid #000000;">
        </canvas>`;
    tetrisDivElement.appendChild(tetrisCanvasDiv);
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById(CANVAS_DIV_ID);
    return <CanvasRenderingContext2D>canvas.getContext("2d");
}

function initGame(ctx: CanvasRenderingContext2D, tetrisScoreDiv:HTMLElement) {
    let tetrisGraphics: TetrisGraphics = new TetrisCanvasGraphics(
        ctx, TETRIS_WIDTH / TETRIS_BLOCKS_WIDTH, TETRIS_HEIGHT / TETRIS_BLOCKS_HEIGHT, TETRIS_WIDTH, TETRIS_HEIGHT);
    let gameController: TetrisGameController = new TetrisGameController(TETRIS_BLOCKS_WIDTH, TETRIS_BLOCKS_HEIGHT, tetrisGraphics, tetrisScoreDiv);
    gameController.observeKeyboard();
    gameController.observeTimer();
}

function createScoreDiv(): HTMLElement{
    let tetrisScoreDiv: HTMLElement = document.createElement("tetris-score-div");
    tetrisDivElement.appendChild(tetrisScoreDiv);
    return tetrisScoreDiv;
}

let tetrisDivElement: HTMLElement = document.getElementById("tetris-game-div")!;
let ctx: CanvasRenderingContext2D = initCanvasElements();
let tetrisScoreDiv:HTMLElement = createScoreDiv();
initGame(ctx, tetrisScoreDiv);


