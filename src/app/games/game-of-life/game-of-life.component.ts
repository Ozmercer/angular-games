import {Component, OnDestroy, OnInit} from '@angular/core';
import {BoardService, Cell} from './board.service';

@Component({
  selector: 'app-game-of-life',
  templateUrl: './game-of-life.component.html',
  styleUrls: ['./game-of-life.component.scss']
})
export class GameOfLifeComponent implements OnInit, OnDestroy {
  started: boolean;
  interval: number | any;
  fillPercent: number;
  gameOver: boolean;
  tooltip: string;
  currentStreak: number;
  longestStreak: number;

  constructor(public boardService: BoardService) {
    this.started = false;
    this.fillPercent = 50;
    this.gameOver = false;
    this.longestStreak = 0;
    this.currentStreak = 0;
    this.tooltip = `
    On each tick, the following will happen:

    ● If a healthy monkey has 3 neighboring infected cells, he will also get infected.

    ● if an infected monkey has less than 2 infected neighbours, he will get cured thanks to social distancing.

    ● If an infected monkey has more than 3 infected neighbours, he will be cured because of medical hot-spot treatment.
    `;
  }

  ngOnInit(): void {
    this.boardService.initField();
  }

  startGame(speed: number) {
    this.currentStreak = 0;
    this.pauseGame();
    this.started = true;
    this.gameOver = false;
    this.interval = setInterval(() => {
      this.currentStreak++;
      if (this.currentStreak > this.longestStreak) {
        this.longestStreak = this.currentStreak
      }
      this.boardService.calculateField();
      if (this.boardService.checkGameOver()) {
        this.gameOver = true;
        this.pauseGame();
      }
    }, 1000 / speed);
  }

  clearGame() {
    this.started = false;
    this.pauseGame();
    this.boardService.clearGame();
  }

  randomFill() {
    this.pauseGame();
    this.boardService.randomFill(this.fillPercent);
  }

  pauseGame() {
    this.started = false;
    clearInterval(this.interval);
  }

  onDraw(cell: Cell, ev: MouseEvent) {
    if (ev.buttons === 0) {
      return;
    }
    cell.alive = !cell.alive;
  }

  ngOnDestroy(): void {
    this.clearGame();
  }
}
