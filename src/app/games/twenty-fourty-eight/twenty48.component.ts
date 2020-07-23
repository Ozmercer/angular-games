import {Component, HostListener, OnInit} from '@angular/core';

interface Tile {
  row: number;
  col: number;
  value: number;
}

@Component({
  selector: 'app-twenty-fourty-eight',
  templateUrl: './twenty48.component.html',
  styleUrls: ['./twenty48.component.scss']
})

export class Twenty48Component implements OnInit {
  table: Tile[] = [];
  score: number;
  uniqueTiles: number;
  changed: boolean;
  gameOver: boolean;
  testMode: boolean;
  win: boolean;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (
      event.key === 'ArrowDown'
      || event.key === 'ArrowUp'
      || event.key === 'ArrowLeft'
      || event.key === 'ArrowRight'
      || event.key === 'w'
      || event.key === 'a'
      || event.key === 's'
      || event.key === 'd'
    ) {
      event.preventDefault();
      this.play(event.key);
    }
  }

  constructor() {
    this.score = 0;
    this.uniqueTiles = 1;
    this.changed = false;
    this.gameOver = false;
    this.testMode = false;
    this.win = false;
  }

  ngOnInit(): void {
    this.setNewGame();
  }

  addTile() {
    const emptyTiles = this.table.filter(tile => !tile.value);
    const randomIdx = Math.floor(Math.random() * emptyTiles.length);
    const randomEmptyTile = emptyTiles[randomIdx];
    randomEmptyTile.value = 2 ** Math.floor(Math.random() * (this.uniqueTiles) + 1);

    this.changed = false;
  }

  findTile(row, col) {
    const table = this.testMode
      ? this.table.map(tile => ({...tile}))  // deep copy
      : this.table;
    return table.find(tile => tile.row === row && tile.col === col);
  }

  play(direction) {
    switch (direction) {
      case 'ArrowUp':
      case 'w':
        for (let col = 0; col < 4; col++) {
          this.moveTo(1, col, this.findTile(0, col), 'up');
        }
        break;
      case 'ArrowDown':
      case 's':
        for (let col = 0; col < 4; col++) {
          this.moveTo(2, col, this.findTile(3, col), 'down');
        }
        break;
      case 'ArrowLeft':
      case 'a':
        for (let row = 0; row < 4; row++) {
          this.moveTo(row, 1, this.findTile(row, 0), 'left');
        }
        break;
      case 'ArrowRight':
      case 'd':
        for (let row = 0; row < 4; row++) {
          this.moveTo(row, 2, this.findTile(row, 3), 'right');
        }
        break;
    }
    if (!this.testMode && this.changed) {
      this.addTile();
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
    const thisTile = this.findTile(row, col);
    // completed table - end
    if (endCondition()) {
      return;
    }
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
      thisTile.value = null;
      if (prevTile.value === 2048) {
        this.win = true;
      }
      // new tile can be up to 3 steps less than highest current tile
      if (prevTile.value > 2 ** (this.uniqueTiles + 3)) {
        this.uniqueTiles++;
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
    this.uniqueTiles = 1;
    this.win = false;
    this.gameOver = false;

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        this.table.push({row: i, col: j, value: null});
      }
    }
    this.addTile();
    this.addTile();
  }
}
