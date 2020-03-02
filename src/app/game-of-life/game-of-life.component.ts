import { Component, OnInit } from '@angular/core';

interface Cell {
  row: number;
  col: number;
  alive: boolean;
}

@Component({
  selector: 'app-game-of-life',
  templateUrl: './game-of-life.component.html',
  styleUrls: ['./game-of-life.component.scss']
})
export class GameOfLifeComponent implements OnInit {
  BOARD_SIZE = 35;
  started: boolean;
  field: Cell[];
  interval: number;
  fillPercent: number;

  constructor() {
    this.started = false;
    this.field = [];
    this.fillPercent = 50;
  }

  ngOnInit(): void {
    this.field = this.buildField();
  }

  buildField() {
    const field = [];
    for(let i = 0; i < this.BOARD_SIZE; i++) {
      for(let j = 0; j < this.BOARD_SIZE; j++) {
        field.push({row: i, col: j, alive: false})
      }
    }
    return field;
  }

  startGame(speed = 1) {
    this.pauseGame();
    this.started = true;
    this.interval = setInterval(() => {
      this.calculateField();
    }, 1000 / speed)
  }

  clearGame() {
    this.started = false;
    this.pauseGame();
    this.field = this.buildField()
  }

  randomFill() {
    this.pauseGame();
    this.field.forEach(cell => {
      cell.alive = Math.random() < (this.fillPercent / 100)
    })
  }

  pauseGame() {
    this.started = false;
    clearInterval(this.interval)
  }

  calculateField() {
    let newField = [];
    newField = this.buildField();
    this.field.forEach((cell, index) => {
      const neighbours = this.livingNeighboursCount(cell);
      if(neighbours < 2) {
        newField[index].alive = false;
      } else if (neighbours > 3) {
        newField[index].alive = false
      } else if (neighbours === 3) {
        newField[index].alive = true
      } else if (cell.alive && neighbours >= 2 && neighbours <= 3) {
        newField[index].alive = true
      }
    });

    this.field = newField;
  }

  livingNeighboursCount(cell) {
    let counter = 0;
    for(let i = -1; i <= 1; i++) {
      for(let j = -1; j <= 1; j++) {
        if(!(i === 0 && j === 0)
          && cell.row + i < this.BOARD_SIZE && cell.col + j < this.BOARD_SIZE
          && cell.row + i >= 0 && cell.col + j >= 0) {
          counter += this.findCell(cell.row + i, cell.col + j)?.alive ? 1 : 0
        }
      }
    }
    return counter
  }

  findCell(row, col) {
    if (this.field[row * this.BOARD_SIZE + col]?.alive) {
    }
    return this.field[row * this.BOARD_SIZE + col]
  }
}
