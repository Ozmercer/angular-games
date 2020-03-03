import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface Cell {
  row: number;
  col: number;
  alive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  field = new BehaviorSubject<Cell[]>([]);
  BOARD_SIZE = 40;

  constructor() {
  }

  initField() {
    this.field.next(this.buildField());
  }

  calculateField() {
    let newField = [];
    newField = this.buildField();
    this.field.getValue().forEach((cell, index) => {
      const neighbours = this.livingNeighboursCount(cell);
      if (neighbours < 2) {
        newField[index].alive = false;
      } else if (neighbours > 3) {
        newField[index].alive = false;
      } else if (neighbours === 3) {
        newField[index].alive = true;
      } else if (cell.alive && neighbours >= 2 && neighbours <= 3) {
        newField[index].alive = true;
      }
    });

    this.field.next(newField);
  }

  livingNeighboursCount(cell) {
    let counter = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (!(i === 0 && j === 0)
          && cell.row + i < this.BOARD_SIZE && cell.col + j < this.BOARD_SIZE
          && cell.row + i >= 0 && cell.col + j >= 0) {
          counter += this.findCell(cell.row + i, cell.col + j)?.alive ? 1 : 0;
        }
      }
    }
    return counter;
  }

  buildField() {
    const field = [];
    for (let i = 0; i < this.BOARD_SIZE; i++) {
      for (let j = 0; j < this.BOARD_SIZE; j++) {
        field.push({row: i, col: j, alive: false});
      }
    }
    return field;
  }

  findCell(row, col) {
    if (this.field.getValue()[row * this.BOARD_SIZE + col]?.alive) {
    }
    return this.field.getValue()[row * this.BOARD_SIZE + col];
  }

  randomFill(fillPercent: number) {
    this.field.getValue().forEach(cell => {
      cell.alive = Math.random() < (fillPercent / 100);
    });
  }

  clearGame() {
    this.field.next(this.buildField());
  }
}
