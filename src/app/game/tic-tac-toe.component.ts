import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})

export class TicTacToeComponent implements OnInit {
  isX: boolean;
  squares: { mark: string }[];
  winner: string;

  constructor() {
    this.resetGame();
  }

  ngOnInit(): void {
  }

  resetGame() {
    this.winner = null;
    this.isX = true;
    this.squares = [];
    for (let i = 0; i < 9; i++) {
      this.squares.push({mark: null});
    }
  }

  onSquareClick(square) {
    if (square.mark || this.winner) {
      return;
    }

    square.mark = this.isX ? 'X' : 'O';
    this.isX = !this.isX;
    const winner = this.calculateWinner();
    if (winner) {
      this.winner = winner;
    }
  }

  calculateWinner() {
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
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (this.squares[a].mark && this.squares[a].mark === this.squares[b].mark && this.squares[a].mark === this.squares[c].mark) {
        return this.squares[a].mark;
      }
    }
    return null;
  }
}
