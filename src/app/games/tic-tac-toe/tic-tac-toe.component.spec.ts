import {async, ComponentFixture, fakeAsync, flush, TestBed, tick} from '@angular/core/testing';

import {TicTacToeComponent} from './tic-tac-toe.component';
import {MatButtonModule} from '@angular/material/button';
import {TTTMark} from './interfaces';

describe('GameComponent', () => {
  let component: TicTacToeComponent;
  let fixture: ComponentFixture<TicTacToeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TicTacToeComponent],
      imports: [MatButtonModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicTacToeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset the board when clicking reset', function () {
    component.squares = [
      {mark: TTTMark.X},
      {mark: TTTMark.X},
      {mark: TTTMark.X},
      {mark: null},
      {mark: TTTMark.O},
      {mark: TTTMark.O},
      {mark: TTTMark.O},
      {mark: null},
      {mark: TTTMark.X},
    ];
    component.isX = false;
    component.winner = TTTMark.X;

    component.resetGame();

    expect(component.isX).toEqual(true);
    expect(component.squares.find(cell => cell.mark !== null)).toBeFalsy();
    expect(component.winner).toEqual(null);
  });

  it('should toggle play mode when clicking buttons', () => {
    const compiled = fixture.nativeElement;
    compiled.querySelector('.players').children[1].click();
    expect(component.twoPlayerMode).toEqual(true);
    compiled.querySelector('.players').children[0].click();
    expect(component.twoPlayerMode).toEqual(false);
  });

  it('should add interchanging marks to board on 2 player mode', () => {
    component.twoPlayerMode = true;
    const compiled = fixture.nativeElement;
    compiled.querySelectorAll('.square')[0].click();
    expect(component.squares[0].mark).toEqual(TTTMark.X);
    compiled.querySelectorAll('.square')[1].click();
    expect(component.squares[1].mark).toEqual(TTTMark.O);
  });

  it('should prevent clicking when computer is thinking on 1 player mode', fakeAsync(() => {
    component.twoPlayerMode = false;
    const compiled = fixture.nativeElement;
    compiled.querySelectorAll('.square')[0].click();
    expect(component.squares[0].mark).toEqual(TTTMark.X);
    compiled.querySelectorAll('.square')[1].click();
    expect(component.squares[1].mark).toEqual(null);

    tick(500);
    fixture.detectChanges();
    expect(component.squares.find(cell => cell.mark === TTTMark.O)).toBeTruthy();

    const freeCellId = component.squares.findIndex(cell => !cell.mark);
    compiled.querySelectorAll('.square')[freeCellId].click();
    expect(component.squares[freeCellId].mark).toEqual(TTTMark.X);

    flush();
  }));

  it('should end game and show winner', () => {
    const compiled = fixture.nativeElement;
    const squares = compiled.querySelectorAll('.square');
    component.twoPlayerMode = true;

    squares[0].click();
    squares[3].click();
    squares[1].click();
    squares[4].click();
    squares[2].click();

    fixture.detectChanges();

    expect(component.winner).toEqual(TTTMark.X);
    expect(compiled.querySelector('.player').innerText).toEqual('X WINS!');

    squares[5].click();
    expect(component.squares[5].mark).toEqual(null);
  });

  it('should tie if no winner', () => {
    const compiled = fixture.nativeElement;
    const squares = compiled.querySelectorAll('.square');
    component.twoPlayerMode = true;

    squares[0].click();
    squares[3].click();
    squares[1].click();
    squares[4].click();
    squares[5].click();
    squares[2].click();
    squares[8].click();
    squares[7].click();
    squares[6].click();

    fixture.detectChanges();

    expect(component.winner).toEqual('TIE! NOBODY');
    expect(compiled.querySelector('.player').innerText).toEqual('TIE! NOBODY WINS!');
  });

  describe('Auto move', () => {
    it('should make win move if possible', fakeAsync(() => {
      const compiled = fixture.nativeElement;
      component.twoPlayerMode = true;
      const squares = compiled.querySelectorAll('.square');

      squares[0].click();
      squares[3].click();
      squares[1].click();
      squares[4].click();
      component.twoPlayerMode = false;
      squares[6].click();

      tick(500);
      expect(component.winner).toEqual(TTTMark.O);
    }));

    it('should make block move if possible and can\'t win', fakeAsync(() => {
      const compiled = fixture.nativeElement;
      component.twoPlayerMode = true;

      compiled.querySelectorAll('.square')[0].click();
      compiled.querySelectorAll('.square')[3].click();
      component.twoPlayerMode = false;
      compiled.querySelectorAll('.square')[4].click();

      tick(500);
      expect(component.squares[8].mark).toEqual(TTTMark.O);
    }));
  });
});
