import {Component, OnInit} from '@angular/core';
import {TTTCell, TTTMark} from './interfaces';

@Component({
  selector: 'app-game',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})

export class TicTacToeComponent implements OnInit {
  isX: boolean;
  squares: TTTCell[];
  winner: string;
  twoPlayerMode: boolean;

  ngOnInit(): void {
    this.resetGame();
    this.twoPlayerMode = false;
  }

  resetGame() {
    this.winner = null;
    this.isX = true;
    this.squares = [];
    for (let i = 0; i < 9; i++) {
      this.squares.push({mark: null});
    }
  }

  toggleGameMode(is2Player: boolean) {
    if (is2Player !== this.twoPlayerMode) {
      this.twoPlayerMode = is2Player;
      this.resetGame();
    }
  }

  onSquareClick(square: TTTCell, auto?: boolean) {
    if (square?.mark || this.winner || (!this.twoPlayerMode && !this.isX && !auto)) {
      return;
    }

    square.mark = this.isX ? TTTMark.X : TTTMark.O;
    this.isX = !this.isX;
    this.winner = this.calculateWinner();

    if (!this.twoPlayerMode && !this.isX) {
      setTimeout(() => {
        this.autoMove();
      }, 500);
    }
  }

  autoMove() {
    const freeCells = this.squares.filter(cell => !cell.mark);
    let nextMove = freeCells[Math.floor(Math.random() * freeCells.length)];   // Random cell
    freeCells.forEach(cell => {
      // Check if win move
      cell.mark = TTTMark.O;
      if (this.calculateWinner()) {
        cell.mark = null;
        this.onSquareClick(cell, true);
        return;
      }

      // Check if can block
      cell.mark = TTTMark.X;
      if (this.calculateWinner()) {
        cell.mark = null;
        nextMove = cell;
      }
      cell.mark = null;
    });
    this.onSquareClick(nextMove, true);
  }

  calculateWinner(): TTTMark | string {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (this.squares[a].mark && this.squares[a].mark === this.squares[b].mark && this.squares[a].mark === this.squares[c].mark) {
        return this.squares[a].mark;
      }
    }

    if (!this.squares.find(cell => !cell.mark)) {
      return 'TIE! NOBODY';
    }

    return null;
  }
}
