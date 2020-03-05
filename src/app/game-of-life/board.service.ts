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
  field: Cell[] = [];
  BOARD_SIZE = 30;
  worker: Worker;

  constructor() {
  }

  initField() {
    if (typeof Worker !== 'undefined') {
      // Create a new
      this.worker = new Worker('./board.worker', { type: 'module' });
      this.worker.onmessage = ({ data }) => {
        if (data.message === 'updateField') {
          this.repopulateField(data.body);
        } else {
          console.log('caught: ' + data.message);
        }
      };
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
    this.buildField();
  }

  calculateField() {
    this.worker.postMessage({message: 'updateField', prevField: this.field});
  }

  buildField() {
    this.worker.postMessage({message: 'buildField', boardSize: this.BOARD_SIZE});
  }

  randomFill(fillPercent: number) {
    this.field.forEach(cell => {
      cell.alive = Math.random() < (fillPercent / 100);
    });
  }

  clearGame() {
    this.buildField();
  }

  checkGameOver(): boolean {
    return !this.field.find(cell => cell.alive);
  }

  repopulateField(newField: Cell[]) {
    newField.forEach((cell, index) => {
      this.field[index] = cell;
    });
  }
}
