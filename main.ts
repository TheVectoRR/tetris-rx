import {TetrisGameField} from "./game/TetrisGameField";

const TETRIS_HEIGHT: number = 800;
const TETRIS_WIDTH: number = 600;

let tetrisDivElement: HTMLElement = document.getElementById("tetris-game-div")!;
let tetrisCanvasDiv: HTMLElement = document.createElement("tetris-gamefield-div");
tetrisDivElement.appendChild(tetrisCanvasDiv);

let gameField:TetrisGameField = new TetrisGameField(TETRIS_HEIGHT, TETRIS_WIDTH, tetrisCanvasDiv);
gameField.startGame();


