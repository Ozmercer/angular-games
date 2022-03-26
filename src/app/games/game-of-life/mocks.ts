import {GOLCell} from './interfaces';

const generate3X3Field = (aliveCells: [row: number, col: number][] = []): GOLCell[] => {
  const field: GOLCell[] = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      field.push({row: i, col: j, alive: !!aliveCells.find(x => x[0] === i && x[1] === j)});
    }
  }

  return field;
}

export const GOLMocks = {
  generate3X3Field,
}
