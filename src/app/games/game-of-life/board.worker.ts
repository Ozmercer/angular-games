/// <reference lib="webworker" />

interface Cell {
  row: number;
  col: number;
  alive: boolean;
}

let boardSize = 31;
let currentField: Cell[] = [];

function buildField() {
  const field = [];
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      field.push({row: i, col: j, alive: false});
    }
  }
  return field;
}

function calculateField() {
  const newField: Cell[] = buildField();
  let changed = false;
  currentField.forEach((cell, index) => {
    const neighbours = livingNeighboursCount(cell);
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
  return {newField, changed};
}

function livingNeighboursCount(cell) {
  let counter = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (
        !(i === 0 && j === 0)
        && cell.row + i < boardSize
        && cell.col + j < boardSize
        && cell.row + i >= 0
        && cell.col + j >= 0
      ) {
        counter += findCell(cell.row + i, cell.col + j).alive ? 1 : 0;
      }
    }
  }
  return counter;
}

function findCell(row, col) {
  return currentField[row * boardSize + col];
}

addEventListener('message', ({data}) => {
  switch (data.message) {
    case 'buildField':
      boardSize = data.boardSize;
      const field = [];
      for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
          field.push({row: i, col: j, alive: false});
        }
      }
      postMessage({message: 'updateField', body: field});
      break;
    case 'updateField':
      currentField = data.prevField;
      const {newField, changed} = calculateField();
      currentField = [];
      postMessage({message: 'updateField', body: newField, changed});
      break;
    default:
      break;
  }
});
