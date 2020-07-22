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

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (
      event.key === 'ArrowDown'
      || event.key === 'ArrowUp'
      || event.key === 'ArrowLeft'
      || event.key === 'ArrowRight'
    ) {
      event.preventDefault();
      this.play(event.key);
    }
  }

  constructor() {
    this.score = 0;
    this.uniqueTiles = 3;
  }

  ngOnInit(): void {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        this.table.push({row: i, col: j, value: null});
      }
    }
    this.addTile();
    this.addTile();
  }

  addTile() {
    const emptyTiles = this.table.filter(tile => !tile.value);
    const randomIdx = Math.floor(Math.random() * emptyTiles.length);
    const randomEmptyTile = emptyTiles[randomIdx];
    randomEmptyTile.value = 2 ** Math.floor(Math.random() * (this.uniqueTiles) + 1);
  }

  play(direction) {
    switch (direction) {
      case 'ArrowDown':
        for (let col = 0; col < 4; col++) {
          this.moveDown(2, col, this.findTile(3, col));
        }
        break;
      case 'ArrowUp':
        for (let col = 0; col < 4; col++) {
          this.moveUp(1, col, this.findTile(0, col));
        }
        break;
      case 'ArrowLeft':
        for (let row = 0; row < 4; row++) {
          this.moveLeft(row, 1, this.findTile(row, 0));
        }
        break;
      case 'ArrowRight':
        for (let row = 0; row < 4; row++) {
          this.moveRight(row, 2, this.findTile(row, 3));
        }
        break;
      default: return;
    }
    this.addTile();
  }

  moveDown(row: number, col: number, belowTile: Tile) {
    const thisTile = this.findTile(row, col);
    // completed table - end
    if (row < 0) {
      return;
    }
    // cell empty - continue
    if (!thisTile.value) {
      this.moveDown(row - 1, col, thisTile);
    }
    // cell blocked - end
    if (belowTile.value && this.findTile(row, col).value !== belowTile.value) {
      return this.moveDown(row - 1, col, thisTile);
    }
    // cells match - combine and restart
    if (belowTile.value && thisTile.value === belowTile.value) {
      console.log(thisTile, belowTile);
      belowTile.value *= 2;
      thisTile.value = null;
      this.moveDown(row, col, belowTile);
    }
    // next cell is empty - move tile and restart
    if (thisTile.value && !belowTile.value) {
      belowTile.value = thisTile.value;
      thisTile.value = null;
      this.moveDown(row, col, belowTile);
    }
  }

  moveUp(row: number, col: number, aboveTile: Tile) {
    const thisTile = this.findTile(row, col);

    // completed table - end
    if (row > 3) {
      return;
    }
    // cell empty - continue
    if (!thisTile.value) {
      this.moveUp(row + 1, col, thisTile);
    }
    // cell blocked - end
    if (aboveTile.value && this.findTile(row, col).value !== aboveTile.value) {
      return this.moveUp(row + 1, col, thisTile);
    }
    // cells match - combine and restart
    if (aboveTile.value && thisTile.value === aboveTile.value) {
      aboveTile.value *= 2;
      thisTile.value = null;
      this.moveUp(row, col, aboveTile);
    }
    // next cell is empty - move tile and restart
    if (thisTile.value && !aboveTile.value) {
      aboveTile.value = thisTile.value;
      thisTile.value = null;
      this.moveUp(row, col, aboveTile);
    }
  }

  moveLeft(row: number, col: number, aboveTile: Tile) {
    const thisTile = this.findTile(row, col);

    // completed table - end
    if (col > 3) {
      return;
    }
    // cell empty - continue
    if (!thisTile.value) {
      this.moveLeft(row, col + 1, thisTile);
    }
    // cell blocked - end
    if (aboveTile.value && this.findTile(row, col).value !== aboveTile.value) {
      return this.moveLeft(row, col + 1, thisTile);
    }
    // cells match - combine and restart
    if (aboveTile.value && thisTile.value === aboveTile.value) {
      aboveTile.value *= 2;
      thisTile.value = null;
      this.moveLeft(row, col, aboveTile);
    }
    // next cell is empty - move tile and restart
    if (thisTile.value && !aboveTile.value) {
      aboveTile.value = thisTile.value;
      thisTile.value = null;
      this.moveLeft(row, col, aboveTile);
    }
  }

  moveRight(row: number, col: number, aboveTile: Tile) {
    const thisTile = this.findTile(row, col);

    // completed table - end
    if (col < 0) {
      return;
    }
    // cell empty - continue
    if (!thisTile.value) {
      this.moveRight(row, col - 1, thisTile);
    }
    // cell blocked - end
    if (aboveTile.value && this.findTile(row, col).value !== aboveTile.value) {
      return this.moveRight(row, col - 1, thisTile);
    }
    // cells match - combine and restart
    if (aboveTile.value && thisTile.value === aboveTile.value) {
      aboveTile.value *= 2;
      thisTile.value = null;
      this.moveRight(row, col, aboveTile);
    }
    // next cell is empty - move tile and restart
    if (thisTile.value && !aboveTile.value) {
      aboveTile.value = thisTile.value;
      thisTile.value = null;
      this.moveRight(row, col, aboveTile);
    }
  }

  findTile(row, col) {
    return this.table.find(tile => tile.row === row && tile.col === col);
  }
}
