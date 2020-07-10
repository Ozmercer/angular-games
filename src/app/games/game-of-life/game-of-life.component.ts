import {Component, OnDestroy, OnInit} from '@angular/core';
import {BoardService, Cell} from './board.service';

@Component({
  selector: 'app-game-of-life',
  templateUrl: './game-of-life.component.html',
  styleUrls: ['./game-of-life.component.scss']
})
export class GameOfLifeComponent implements OnInit, OnDestroy {
  started: boolean;
  interval: number;
  fillPercent: number;
  gameOver: boolean;

  constructor(public boardService: BoardService) {
    this.started = false;
    this.fillPercent = 50;
    this.gameOver = false;
  }

  ngOnInit(): void {
    this.boardService.initField();
  }

  startGame(speed = 1) {
    this.pauseGame();
    this.started = true;
    this.gameOver = false;
    this.interval = setInterval(() => {
      this.boardService.calculateField();
      setTimeout(() => {
        if (this.boardService.checkGameOver()) {
          this.gameOver = true;
          this.pauseGame();
        }
      }, 0);
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
