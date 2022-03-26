import {Injectable} from '@angular/core';
import {GOLCell} from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  BOARD_SIZE = 37;
  changed = false;
  colSpread = 2;
  field: GOLCell[] = [];
  pattern = 1;
  rowSpread = 2;
  tileSize = 1;
  toggleMode = false;

  initField() {
    this.field = this.generateField();
  }

  unregister() {
    this.initField();
  }

  calculateField() {
    const newField: GOLCell[] = this.generateField();
    let changed = false;
    this.field.forEach((cell, index) => {
      const neighbours: number = this.livingNeighboursCount(cell);
      if (neighbours < 2) {
        newField[index].alive = false;
      } else if (neighbours > 3) {
        newField[index].alive = false;
      } else if (neighbours === 3) {
        newField[index].alive = true;
      } else if (cell.alive) {
        newField[index].alive = true;
      }
      if (!changed && newField[index].alive !== cell.alive) {
        changed = true;
      }
    });

    this.field = newField;
    this.changed = changed
  }

  livingNeighboursCount(cell: GOLCell): number {
    let counter = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (
          !(i === 0 && j === 0)
          && cell.row + i < this.BOARD_SIZE
          && cell.col + j < this.BOARD_SIZE
          && cell.row + i >= 0
          && cell.col + j >= 0
        ) {
          counter += this.findCell(cell.row + i, cell.col + j).alive ? 1 : 0;
        }
      }
    }
    return counter;
  }

  findCell(row: number, col: number): GOLCell {
    return this.field[row * this.BOARD_SIZE + col];
  }

  generateField(): GOLCell[] {
    const field = [];
    for (let i = 0; i < this.BOARD_SIZE; i++) {
      for (let j = 0; j < this.BOARD_SIZE; j++) {
        field.push({row: i, col: j, alive: false});
      }
    }
    return field;
  }

  randomFill(fillPercent: number) {
    this.field.forEach(cell => cell.alive = Math.random() < (fillPercent / 100));
  }

  fillEdges(side = 'all') {
    const topRow = (cell: GOLCell) => cell.row === 0;
    const bottomRow = (cell: GOLCell) => cell.row === this.BOARD_SIZE - 1;
    const leftCol = (cell: GOLCell) => cell.col === 0;
    const rightCol = (cell: GOLCell) => cell.col === this.BOARD_SIZE - 1;

    let condition;
    switch (side) {
      case 'top':
        condition = (cell: GOLCell) => topRow(cell);
        break;
      case 'bottom':
        condition = (cell: GOLCell) => bottomRow(cell);
        break;
      case 'left':
        condition = (cell: GOLCell) => leftCol(cell);
        break;
      case 'right':
        condition = (cell: GOLCell) => rightCol(cell);
        break;
      default:
        condition = (cell: GOLCell) => topRow(cell) || bottomRow(cell) || leftCol(cell) || rightCol(cell)
    }

    this.field.forEach(cell => {
      if (condition(cell)) {
        cell.alive = this.toggleMode ? !cell.alive : true;
      }
    });
  }

  fillX() {
    this.field.forEach(cell => {
      if (cell.col === cell.row || cell.col === this.BOARD_SIZE - 1 - cell.row) {
        cell.alive = this.toggleMode ? !cell.alive : true;
      }
    });
  }

  fillTiles(size: number) {
    this.field.forEach(cell => {
      if ((cell.col % size && !(cell.row % size)) || (cell.row % size && !(cell.col % size))) {
        cell.alive = this.toggleMode ? !cell.alive : true;
      }
    });
  }

  fillLines(size: number, isCol = true) {
    this.field.forEach(cell => {
      if (cell[isCol ? 'col' : 'row'] % size === 0) {
        cell.alive = this.toggleMode ? !cell.alive : true;
      }
    });
  }

  fillPatter(size: number) {
    this.field.forEach((cell, index) => {
      cell.alive = index % size === 0;
    });
  }

  clearGame() {
    this.field = this.generateField();
  }

  checkGameOver(): boolean {
    return this.changed === false || !this.field.find(cell => cell.alive);
  }
}
