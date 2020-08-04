import {Component, HostListener, OnInit} from '@angular/core';

export interface Tile {
  row: number;
  col: number;
  value: number;
  isNew?: boolean;
  isMerged?: boolean;
}

@Component({
  selector: 'app-twenty-fourty-eight',
  templateUrl: './twenty48.component.html',
  styleUrls: ['./twenty48.component.scss']
})

export class Twenty48Component implements OnInit {
  table: Tile[];
  gameHistory: { table: Tile[], score: number }[];
  score: number;
  highscore: number;
  changed: boolean;
  gameOver: boolean;
  testMode: boolean;
  win: boolean;
  tilt: string;
  actionKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'];

  @HostListener('document:keydown', ['$event'])
  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (
      event.type === 'keydown'
      && !this.gameOver
      && this.actionKeys.includes(event.key)
    ) {
      event.preventDefault();
      this.play(event.key);
    }
    if (event.type === 'keyup' && this.actionKeys.includes(event.key)) {
      this.tilt = null;
    }
  }

  constructor() {
    this.table = [];
    this.gameHistory = [];
    this.score = 0;
    this.changed = false;
    this.gameOver = false;
    this.testMode = false;
    this.win = false;
    this.highscore = +localStorage.getItem('highscore') || 0;
    this.tilt = null;
  }

  ngOnInit(): void {
    this.setNewGame();
  }

  addTile() {
    const emptyTiles = this.table.filter(tile => !tile.value);
    const randomIdx = Math.floor(Math.random() * emptyTiles.length);
    const randomEmptyTile = emptyTiles[randomIdx];
    randomEmptyTile.value = this.score < 2 ? 2 : 2 ** Math.floor(Math.random() * 2 + 1);
    randomEmptyTile.isNew = true;

    this.changed = false;
  }

  findTile(row, col) {
    const table = this.testMode
      ? this.table.map(tile => ({...tile}))  // deep copy
      : this.table;
    return table.find(tile => tile.row === row && tile.col === col);
  }

  play(direction) {
    const prevTable = this.table.map(tile => ({...tile}));
    const prevScore = this.score;

    switch (direction) {
      case 'ArrowUp':
      case 'w':
        this.tilt = 'up';
        for (let col = 0; col < 4; col++) {
          this.moveTo(1, col, this.findTile(0, col), 'up');
        }
        break;
      case 'ArrowDown':
      case 's':
        this.tilt = 'down';
        for (let col = 0; col < 4; col++) {
          this.moveTo(2, col, this.findTile(3, col), 'down');
        }
        break;
      case 'ArrowLeft':
      case 'a':
        this.tilt = 'left';
        for (let row = 0; row < 4; row++) {
          this.moveTo(row, 1, this.findTile(row, 0), 'left');
        }
        break;
      case 'ArrowRight':
      case 'd':
        this.tilt = 'right';
        for (let row = 0; row < 4; row++) {
          this.moveTo(row, 2, this.findTile(row, 3), 'right');
        }
        break;
    }
    if (!this.testMode && this.changed) {
      this.addTile();
      this.gameHistory.push({table: prevTable, score: prevScore});
      if (this.gameHistory.length > 2) {
        this.gameHistory.shift();
      }
    }

    if (!this.testMode && !this.table.find(tile => tile.value === null)) {
      this.gameOver = this.checkGameOver();
    }
  }

  moveTo(row: number, col: number, prevTile: Tile, direction: string) {
    const endCondition = (): boolean => {
      switch (direction) {
        case 'down':
          return row < 0;
        case 'up':
          return row > 3;
        case 'left':
          return col > 3;
        case 'right':
          return col < 0;
      }
    };
    const nextTile = (): [number, number] => {
      switch (direction) {
        case 'down':
          return [row - 1, col];
        case 'up':
          return [row + 1, col];
        case 'left':
          return [row, col + 1];
        case 'right':
          return [row, col - 1];
      }
    };

    // completed table - end
    if (endCondition()) {
      return;
    }
    const thisTile = this.findTile(row, col);
    thisTile.isNew = false;
    thisTile.isMerged = false;
    const [i, j] = nextTile();
    // cell empty - skip
    if (!thisTile.value) {
      this.moveTo(i, j, thisTile, direction);
    }
    // cell blocked - continue
    if (prevTile.value && this.findTile(row, col).value !== prevTile.value) {
      return this.moveTo(i, j, thisTile, direction);
    }
    // cells match - combine and re-check
    if (prevTile.value && thisTile.value === prevTile.value) {
      prevTile.value *= 2;
      prevTile.isMerged = true;
      thisTile.value = null;
      if (prevTile.value === 2048) {
        this.win = true;
      }
      this.score += prevTile.value;
      if (this.score > this.highscore) {
        this.highscore = this.score;
        localStorage.highscore = this.highscore;
      }
      this.changed = true;
      this.moveTo(row, col, prevTile, direction);
    }
    // next cell is empty - move tile and re-check
    if (thisTile.value && !prevTile.value) {
      prevTile.value = thisTile.value;
      thisTile.value = null;
      this.changed = true;
      this.moveTo(row, col, prevTile, direction);
    }
  }

  checkGameOver() {
    this.testMode = true;

    this.play('w');
    this.play('a');
    const isGameOver = !this.changed;

    this.changed = false;
    this.testMode = false;

    return isGameOver;
  }

  setNewGame() {
    this.table = [];
    this.gameHistory = [];
    this.win = false;
    this.gameOver = false;
    this.score = 0;

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        this.table.push({row: i, col: j, value: null, isNew: false, isMerged: false});
      }
    }
    this.addTile();
    this.addTile();
  }

  undo() {
    const {table, score} = this.gameHistory.pop();
    this.table = table;
    this.score = score;
    this.gameOver = false;
  }
}
