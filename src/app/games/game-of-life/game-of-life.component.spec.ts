import {async, ComponentFixture, fakeAsync, flush, TestBed, tick} from '@angular/core/testing';

import {GameOfLifeComponent} from './game-of-life.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FormsModule} from '@angular/forms';
import {BoardService} from './board.service';

fdescribe('GameOfLifeComponent', () => {
  let component: GameOfLifeComponent;
  let fixture: ComponentFixture<GameOfLifeComponent>;
  let boardService;

  beforeEach(async(() => {
    boardService = jasmine.createSpyObj('BoardService', [
      'initField',
      'calculateField',
      'checkGameOver',
      'randomFill',
      'clearGame']);

    TestBed.configureTestingModule({
      declarations: [GameOfLifeComponent],
      imports: [
        FormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatTooltipModule
      ],
      providers: [
        {provide: BoardService, useValue: boardService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameOfLifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start game when clicking on start button with interval', fakeAsync(() => {
    fixture.nativeElement.querySelector('.start button').click();
    const ticks = 3;
    tick(ticks * 1000);
    expect(component.interval).toBeTruthy();
    expect(component.started).toEqual(true);
    expect(boardService.calculateField).toHaveBeenCalledTimes(ticks);
    expect(boardService.checkGameOver).toHaveBeenCalledTimes(ticks);

    component.clearGame();
    flush();
  }));

  it('should start with upped speed clicking on X8 button', fakeAsync(() => {
    fixture.nativeElement.querySelectorAll('.start button')[3].click();
    const speed = 8;
    const ticks = 3;
    tick(ticks * 1000);
    expect(boardService.calculateField).toHaveBeenCalledTimes(ticks * speed);
    expect(boardService.checkGameOver).toHaveBeenCalledTimes(ticks * speed);

    component.clearGame();
    flush();
  }));

  it('should clear interval on pause game', fakeAsync(() => {
    fixture.nativeElement.querySelector('.start button').click();
    tick(3000);

    fixture.nativeElement.querySelector('.pause').click();
    expect(component.started).toEqual(false);
  }));

  it('should clear board on clicking clear', fakeAsync(() => {
    fixture.nativeElement.querySelector('.start button').click();
    tick(3000);

    fixture.nativeElement.querySelector('.clear').click();
    expect(component.started).toEqual(false);
    expect(boardService.clearGame).toHaveBeenCalledTimes(1);
  }));

  it('should random fill board on clicking button', () => {
    const range = fixture.nativeElement.querySelector('.auto-fill input[type=range]');
    const fillPercent = 37;
    range.value = fillPercent;
    range.dispatchEvent(new Event('change'));
    fixture.nativeElement.querySelector('.auto-fill button').click();

    expect(boardService.randomFill).toHaveBeenCalledWith(fillPercent);
  });
});
