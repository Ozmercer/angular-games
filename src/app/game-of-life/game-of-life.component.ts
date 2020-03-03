import {Component, OnInit} from '@angular/core';
import {BoardService, Cell} from './board.service';

@Component({
  selector: 'app-game-of-life',
  templateUrl: './game-of-life.component.html',
  styleUrls: ['./game-of-life.component.scss']
})
export class GameOfLifeComponent implements OnInit {
  started: boolean;
  interval: number;
  fillPercent: number;

  constructor(private boardService: BoardService) {
    this.started = false;
    this.fillPercent = 50;
  }

  ngOnInit(): void {
    this.boardService.initField();
  }

  startGame(speed = 1) {
    this.pauseGame();
    this.started = true;
    this.interval = setInterval(() => {
      this.boardService.calculateField();
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

  onCellClick(cell: Cell) {
    cell.alive = !cell.alive;
  }
}
