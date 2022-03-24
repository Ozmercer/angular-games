import {Injectable} from '@angular/core';

export interface Cell {
  row: number;
  col: number;
  alive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  field: Cell[] = [];
  changed = false;
  BOARD_SIZE = 30;
  worker: Worker;
  toggleMode = false;
  tileSize = 1;
  colSpread = 2;
  rowSpread = 2;
  pattern = 1;

  constructor() {
  }

  initField() {
    if (typeof Worker !== 'undefined') {
      // Create a new
      this.worker = new Worker('./board.worker', {type: 'module'});
      this.worker.onmessage = ({data}) => {
        if (data.message === 'updateField') {
          this.changed = data.changed;
          this.field = data.body;
        } else {
          console.log('caught: ' + data.message);
        }
      };
    } else {
      alert('This app does not work on your browser. Please try a more modern version');
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
    this.field = this.buildField();
  }

  unregister() {
    this.initField();
    this.worker.terminate();
  }

  calculateField() {
    // this.worker.postMessage({message: 'updateField', prevField: this.field});
    const newField: Cell[] = this.buildField();
    let changed = false;
    this.field.forEach((cell, index) => {
      const neighbours = this.livingNeighboursCount(cell);
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

  livingNeighboursCount(cell) {
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

  findCell(row: number, col: number) {
    return this.field[row * this.BOARD_SIZE + col];
  }

  buildField(): Cell[] {
    // this.worker.postMessage({message: 'buildField', boardSize: this.BOARD_SIZE});
    const field = [];
    for (let i = 0; i < this.BOARD_SIZE; i++) {
      for (let j = 0; j < this.BOARD_SIZE; j++) {
        field.push({row: i, col: j, alive: false});
      }
    }
    return field;
  }

  randomFill(fillPercent: number) {
    this.field.forEach(cell => {
      cell.alive = Math.random() < (fillPercent / 100);
    });
  }

  fillEdges(side = 'all') {
    const topRow = (cell: Cell) => cell.row === 0;
    const bottomRow = (cell: Cell) => cell.row === this.BOARD_SIZE - 1;
    const leftCol = (cell: Cell) => cell.col === 0;
    const rightCol = (cell: Cell) => cell.col === this.BOARD_SIZE - 1;

    let condition;
    switch (side) {
      case 'top':
        condition = (cell: Cell) => topRow(cell);
        break;
      case 'bottom':
        condition = (cell: Cell) => bottomRow(cell);
        break;
      case 'left':
        condition = (cell: Cell) => leftCol(cell);
        break;
      case 'right':
        condition = (cell: Cell) => rightCol(cell);
        break;
      default:
        condition = (cell: Cell) => topRow(cell) || bottomRow(cell) || leftCol(cell) || rightCol(cell)
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
    this.field = this.buildField();
  }

  checkGameOver(): boolean {
    return this.changed === false || !this.field.find(cell => cell.alive);
  }
}
