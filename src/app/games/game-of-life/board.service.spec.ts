import {BoardService} from './board.service';
import {GOLMocks} from './mocks';

describe('Board Service', () => {
  let service: BoardService;

  beforeEach(() => {
    service = new BoardService();
    service.BOARD_SIZE = 3;
    service.field = GOLMocks.generate3X3Field();
    service.initField();
  });


  it('should calculate field', () => {
    service.field = GOLMocks.generate3X3Field([[0,0],[0,2],[2,1]]);

    service.calculateField();
    expect(service.field).toEqual(GOLMocks.generate3X3Field([[1,1]]));

    service.calculateField();
    expect(service.field).toEqual(GOLMocks.generate3X3Field());
  });

  it('should build field', () => {
    expect(service.generateField()).toEqual(GOLMocks.generate3X3Field());
  });

  it('should clear field', () => {
    service.field = GOLMocks.generate3X3Field([[0,0],[0,2],[2,1]]);
    service.clearGame();
    expect(service.generateField()).toEqual(GOLMocks.generate3X3Field());
  });

  it('should randomly fill field', () => {
    expect(service.field.find(cell => cell.alive)).toBeFalsy();

    service.randomFill(100);
    expect(service.field.find(cell => !cell.alive)).toBeFalsy();
  });

  it('should fill top edge', () => {
    service.fillEdges('top');
    expect(service.field.filter(cell => cell.row === 0).find(cell => !cell.alive)).toBeFalsy();
  });

  it('should fill bottom edge', () => {
    service.fillEdges('bottom');
    expect(service.field.filter(cell => cell.row === service.BOARD_SIZE - 1).find(cell => !cell.alive)).toBeFalsy();
  });

  it('should fill left edge', () => {
    service.fillEdges('left');
    expect(service.field.filter(cell => cell.col === 0).find(cell => !cell.alive)).toBeFalsy();
  });

  it('should fill right edge', () => {
    service.fillEdges('right');
    expect(service.field.filter(cell => cell.col === service.BOARD_SIZE - 1).find(cell => !cell.alive)).toBeFalsy();
  });

  it('should fill all edges', () => {
    service.fillEdges();
    expect(service.field
      .filter(cell => cell.col === 0 || cell.col === service.BOARD_SIZE - 1 || cell.row === 0 || cell.row === service.BOARD_SIZE - 1)
      .find(cell => !cell.alive)).toBeFalsy();
  });

  it('should toggle in toggle mode', () => {
    service.field[0].alive = true;
    service.toggleMode = true;
    service.fillEdges();

    expect(service.field[0].alive).toEqual(false);
  });

  it('should fill X', () => {
    service.fillX();
    expect(service.field.filter(cell => cell.col === cell.row).find(cell => !cell.alive)).toBeFalsy();
  });

  [3,4,5,6].forEach(size => {
    it(`should fill tiles of size ${size}`, () => {
      service.fillTiles(size);
      expect(service.field
        .filter(cell => (cell.col % size && !(cell.row % size)) || (cell.row % size && !(cell.col % size)))
        .find(cell => !cell.alive)).toBeFalsy();
    });

    it(`should fill cols of size ${size}`, () => {
      service.fillLines(size);
      expect(service.field
        .filter(cell => cell.col % size === 0)
        .find(cell => !cell.alive)).toBeFalsy();
    });

    it(`should fill rows of size ${size}`, () => {
      service.fillLines(size, false);
      expect(service.field
        .filter(cell => cell.row % size === 0)
        .find(cell => !cell.alive)).toBeFalsy();
    });

    it(`should fill pattern of size ${size}`, () => {
      service.fillPatter(size);
      expect(service.field.filter((cell, i) => i % size === 0)
        .find(cell => !cell.alive)).toBeFalsy();
    });
  })

  it('should game over when board is all dead', () => {
    service.field = GOLMocks.generate3X3Field();
    expect(service.checkGameOver()).toEqual(true);
  });

  it('should game over when no changes', () => {
    service.field = GOLMocks.generate3X3Field([[0,0]]);

    service.changed = true;
    expect(service.checkGameOver()).toEqual(false);

    service.changed = false;
    expect(service.checkGameOver()).toEqual(true);
  });
});
