import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {Twenty48Component} from './twenty48.component';
import {FireworksComponent} from '../../shared/components/fireworks/fireworks.component';

fdescribe('TwentyFourtyEightComponent', () => {
  let component: Twenty48Component;
  let fixture: ComponentFixture<Twenty48Component>;

  const findTile = (row, col) => {
    return component.table.find(tile => tile.row === row && tile.col === col);
  };

  const initialTable = [
    {row: 0, col: 0, value: null},      // Preview:
    {row: 0, col: 1, value: null},      //  - | - | - | -
    {row: 0, col: 2, value: null},      //  - | - | 5 | -
    {row: 0, col: 3, value: null},      //  - | - | - | -
    {row: 1, col: 0, value: null},      //  - | - | - | -
    {row: 1, col: 1, value: null},
    {row: 1, col: 2, value: 5},
    {row: 1, col: 3, value: null},
    {row: 2, col: 0, value: null},
    {row: 2, col: 1, value: null},
    {row: 2, col: 2, value: null},
    {row: 2, col: 3, value: null},
    {row: 3, col: 0, value: null},
    {row: 3, col: 1, value: null},
    {row: 3, col: 2, value: null},
    {row: 3, col: 3, value: null},
  ];

  const mergingTable = [
    {row: 0, col: 0, value: 2},         // Preview:
    {row: 0, col: 1, value: 2},         //  2 | 2 | - | -
    {row: 0, col: 2, value: null},      //  8 | - | 4 | -
    {row: 0, col: 3, value: null},      //  - | - | - | -
    {row: 1, col: 0, value: 8},         //  - | - | 4 | -
    {row: 1, col: 1, value: null},
    {row: 1, col: 2, value: 4},
    {row: 1, col: 3, value: null},
    {row: 2, col: 0, value: null},
    {row: 2, col: 1, value: null},
    {row: 2, col: 2, value: null},
    {row: 2, col: 3, value: null},
    {row: 3, col: 0, value: null},
    {row: 3, col: 1, value: null},
    {row: 3, col: 2, value: 4},
    {row: 3, col: 3, value: null},
  ];

  const gameOverTable = [
    {row: 0, col: 0, value: 1},
    {row: 0, col: 1, value: 3},
    {row: 0, col: 2, value: 4},
    {row: 0, col: 3, value: 5},
    {row: 1, col: 0, value: 6},
    {row: 1, col: 1, value: 7},
    {row: 1, col: 2, value: 9},
    {row: 1, col: 3, value: 10},
    {row: 2, col: 0, value: 11},
    {row: 2, col: 1, value: 12},
    {row: 2, col: 2, value: 13},
    {row: 2, col: 3, value: 14},
    {row: 3, col: 0, value: 15},
    {row: 3, col: 1, value: 17},
    {row: 3, col: 2, value: 18},
    {row: 3, col: 3, value: null},
  ];

  const winTable = [
    {row: 0, col: 0, value: null},      // Preview:
    {row: 0, col: 1, value: null},      //  - | - | - | -
    {row: 0, col: 2, value: null},      //  - | - | - | -
    {row: 0, col: 3, value: null},      //  - | - | - | 1024
    {row: 1, col: 0, value: null},      //  - | - | - | 1024
    {row: 1, col: 1, value: null},
    {row: 1, col: 2, value: null},
    {row: 1, col: 3, value: null},
    {row: 2, col: 0, value: null},
    {row: 2, col: 1, value: null},
    {row: 2, col: 2, value: null},
    {row: 2, col: 3, value: 1024},
    {row: 3, col: 0, value: null},
    {row: 3, col: 1, value: null},
    {row: 3, col: 2, value: null},
    {row: 3, col: 3, value: 1024},
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Twenty48Component, FireworksComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Twenty48Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Clicking arrow keys should move the tiles', () => {
    beforeEach(() => {
      component.table = initialTable.map(tile => ({...tile}));
      fixture.detectChanges();
    });

    it('down', () => testMove('down'));
    it('up', () => testMove('up'));
    it('left', () => testMove('left'));
    it('right', () => testMove('right'));
    it('w', () => testMove('w'));
    it('s', () => testMove('s'));
    it('a', () => testMove('a'));
    it('d', () => testMove('d'));

    const testMove = (direction) => {
      let arrowKey: string;
      let destination: [number, number];

      switch (direction) {
        case 'up':
        case 'w':
          arrowKey = 'ArrowUp';
          destination = [0, 2];
          break;
        case 'down':
        case 's':
          arrowKey = 'ArrowDown';
          destination = [3, 2];
          break;
        case 'left':
        case 'a':
          arrowKey = 'ArrowLeft';
          destination = [1, 0];
          break;
        case 'right':
        case 'd':
          arrowKey = 'ArrowRight';
          destination = [1, 3];
          break;
      }

      expect(findTile(1, 2).value).toEqual(5);
      const event = new KeyboardEvent('keydown', {key: arrowKey});
      document.dispatchEvent(event);
      expect([null, 2]).toContain(component.table.filter(tile => tile.value).length);
      expect(findTile(...destination).value).toEqual(5);
    };

    it('should add a new tile after a move and mark it as new only on first appearance', () => {
      expect(component.table.filter(tile => tile.value).length).toEqual(1);
      document.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
      fixture.detectChanges();
      expect(component.table.filter(tile => tile.value).length).toEqual(2);
      expect(component.table.filter(tile => tile.isNew).length).toEqual(1);

      document.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
      console.log(component.table);
      expect(component.table.filter(tile => tile.isNew).length).toEqual(1);
    });
  });

  describe('Merging and Blocking', () => {
    beforeEach(() => {
      component.table = mergingTable.map(tile => ({...tile}));
      fixture.detectChanges();
    });

    it('should merge two adjacent tiles of the same value', () => {
      expect(findTile(0, 0).value).toEqual(2);
      expect(findTile(0, 1).value).toEqual(2);

      document.dispatchEvent(new KeyboardEvent('keydown', {key: 'a'}));

      expect(findTile(0, 0).value).toEqual(4);
      expect(findTile(0, 0).isMerged).toEqual(true);
      expect([null, 2, 4]).toContain(findTile(0, 1).value);
    });

    it('should merge two non-adjacent tiles of the same value', () => {
      expect(findTile(1, 2).value).toEqual(4);
      expect(findTile(3, 2).value).toEqual(4);

      document.dispatchEvent(new KeyboardEvent('keydown', {key: 's'}));

      expect([null, 2, 4]).toContain(findTile(1, 2).value);
      expect(findTile(3, 2).value).toEqual(8);
      expect(findTile(3, 2).isMerged).toEqual(true);
    });

    it('should not move tile if adjacent tile is of different value', () => {
      expect(findTile(0, 0).value).toEqual(2);
      expect(findTile(1, 0).value).toEqual(8);

      document.dispatchEvent(new KeyboardEvent('keydown', {key: 'w'}));

      expect([null, 2, 4]).toContain(findTile(0, 0).value);
      expect(findTile(1, 0).value).toEqual(8);
      expect(findTile(1, 0).isMerged).toBeFalsy();
    });

    it('should stop on tile if non-adjacent tile is of different value', () => {
      expect(findTile(1, 0).value).toEqual(8);
      expect(findTile(1, 2).value).toEqual(4);
      expect(findTile(1, 3).value).toEqual(null);

      document.dispatchEvent(new KeyboardEvent('keydown', {key: 'd'}));

      expect([null, 2, 4]).toContain(findTile(1, 0).value);
      expect(findTile(1, 2).value).toEqual(8);
      expect(findTile(1, 2).isMerged).toBeFalsy();
      expect(findTile(1, 3).value).toEqual(4);
      expect(findTile(1, 3).isMerged).toBeFalsy();
    });
  });

  it('should trigger game over when no moves left', () => {
    component.table = gameOverTable.map(tile => ({...tile}));
    expect(component.gameOver).toEqual(false);
    document.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowRight'}));
    fixture.detectChanges();

    expect(component.gameOver).toEqual(true);
    expect(fixture.nativeElement.querySelector('.game-over')).toBeTruthy();
  });

  it('should reset board on clicking button', () => {
    localStorage.highscore = 9999;
    component.table = gameOverTable.map(tile => ({...tile}));
    component.win = true;
    component.gameOver = true;

    expect(component.table.filter(tile => tile.value).length).toEqual(15);
    fixture.nativeElement.querySelector('.reset').click();

    expect(component.table.filter(tile => tile.value).length).toEqual(2);
    expect(component.win).toEqual(false);
    expect(component.gameOver).toEqual(false);
    expect(component.score).toEqual(0);
    expect(component.highscore = 9999);
  });

  it('should win game once getting 2048', () => {
    component.table = winTable.map(tile => ({...tile}));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.win-modal')).toBeFalsy();

    document.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'}));
    fixture.detectChanges();

    const modal = fixture.nativeElement.querySelector('.win-modal');
    expect(component.win).toEqual(true);
    expect(modal).toBeTruthy();

    modal.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.win-modal')).toBeFalsy();
  });
});
