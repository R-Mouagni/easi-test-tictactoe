import {Injectable} from '@angular/core';
import {GameSettings} from '../model/game-settings';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  board!: string[][];
  currentPlayer!: string;
  winner!: string | null;
  gameOver!: boolean;
  draw!: boolean;
  gridSize!: number;
  mode!: string;
  symbol1!: string;
  symbol2!: string;

  init(settings: GameSettings): void {
    this.gridSize = settings.gridSize;
    this.board = Array.from({length: this.gridSize}, () => Array.from({length: this.gridSize}, () => ''));
    this.winner = null;
    this.gameOver = false;
    this.draw = false;
    this.mode = settings.mode;
    this.symbol1 = settings.symbol1;
    this.symbol2 = settings.symbol2;
    this.currentPlayer = this.symbol1;
  }

  checkedCell(row: number, col: number): void {
    this.board[row][col] = this.currentPlayer;
    this.checkWinner(row, col);
    if (!this.gameOver) {
      this.changePlayer();
      if (this.mode === '1p' && this.currentPlayer === this.symbol2) {
        this.computerMove()
      }
    }
  }

  computerMove(): void {
    const emptyCells = [];

    for (let rowIndex = 0; rowIndex < this.board.length; rowIndex++) {
      const row = this.board[rowIndex];
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const cell = row[colIndex];
        if (cell === '') {
          emptyCells.push({row: rowIndex, col: colIndex});
        }
      }
    }

    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    this.checkedCell(randomCell.row, randomCell.col);
  }

  changePlayer(): void {
    this.currentPlayer = this.currentPlayer === this.symbol1 ? this.symbol2 : this.symbol1;
  }

  checkWinner(row: number, col: number): void {
    if (this.checkRow(row) || this.checkCol(col) || this.checkDiagonal()) {
      this.winner = this.currentPlayer;
      this.gameOver = true;
    } else if (this.board.flat().every(cell => cell !== '')) {
      this.winner = null;
      this.gameOver = true;
      this.draw = true;
    }
  }

  checkRow(row: number): boolean {
    return this.board[row].every(cell => cell === this.currentPlayer);
  }

  checkCol(col: number): boolean {
    return this.board.every(row => row[col] === this.currentPlayer);
  }

  checkDiagonal(): boolean {
    const leftDiagonal: boolean = this.board.every((row, index) => row[index] === this.currentPlayer);
    const rightDiagonal: boolean = this.board.every((row, index) => row[this.gridSize - 1 - index] === this.currentPlayer);
    return leftDiagonal || rightDiagonal;
  }

  get gameStatus(): string {
    if (this.draw) {
      return 'Egalité !';
    } else if (this.winner) {
      return `Gagnant: ${this.winner}`;
    }
    return '';
  }
}
