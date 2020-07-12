import {BoardService} from './board.service';

describe('Board Service', () => {
  let service: BoardService;
  let mockField;
  const resetMockField = () => {
    mockField = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        mockField.push({row: i, col: j, alive: false});
      }
    }
    return mockField;
  };

  beforeEach(() => {
    service = new BoardService();
    service.field = resetMockField();
    service.initField();
  });

  it('should initiate web worker', () => {
    expect(service.worker).toBeTruthy();
  });

  it('should calculate field', () => {
    spyOn(service.worker, 'postMessage');
    service.field = mockField;
    service.calculateField();
    expect(service.worker.postMessage).toHaveBeenCalledWith({message: 'updateField', prevField: mockField});
  });

  it('should build field', () => {
    spyOn(service.worker, 'postMessage');
    service.field = mockField;
    service.buildField();
    expect(service.worker.postMessage).toHaveBeenCalledWith({message: 'buildField', boardSize: service.BOARD_SIZE});
  });

  it('should clear field', () => {
    spyOn(service.worker, 'postMessage');
    service.field = mockField;
    service.clearGame();
    expect(service.worker.postMessage).toHaveBeenCalledWith({message: 'buildField', boardSize: service.BOARD_SIZE});
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

  it('should fill tiles', () => {
    const size = 3;
    service.fillTiles(size);
    expect(service.field
      .filter(cell => (cell.col % size && !(cell.row % size)) || (cell.row % size && !(cell.col % size)))
      .find(cell => !cell.alive)).toBeFalsy();
  });

  it('should fill cols', () => {
    const size = 3;
    service.fillLines(size);
    expect(service.field
      .filter(cell => cell.col % size === 0)
      .find(cell => !cell.alive)).toBeFalsy();
  });

  it('should fill rows', () => {
    const size = 3;
    service.fillLines(size, false);
    expect(service.field
      .filter(cell => cell.row % size === 0)
      .find(cell => !cell.alive)).toBeFalsy();
  });

  it('should fill pattern', () => {
    const size = 3;
    service.fillPatter(size);
    expect(service.field.filter((cell, i) => i % size === 0)
      .find(cell => !cell.alive)).toBeFalsy();
  });

  it('should game over when board is all dead', () => {
    expect(service.checkGameOver()).toEqual(true);
  });

  it('should game over when no changes', () => {
    service.field[0].alive = true;
    service.changed = true;
    expect(service.checkGameOver()).toEqual(false);

    service.changed = false;
    expect(service.checkGameOver()).toEqual(true);
  });
});
