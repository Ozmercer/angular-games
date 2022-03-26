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
  {row: 0, col: 0, value: 1},         // Preview:
  {row: 0, col: 1, value: 3},         //  1  | 3  | 4  | 5
  {row: 0, col: 2, value: 4},         //  6  | 7  | 9  | 10
  {row: 0, col: 3, value: 5},         //  11 | 12 | 13 | 14
  {row: 1, col: 0, value: 6},         //  15 | 17 | 18 | -
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

export const twenty48Mocks = {
  initialTable,
  mergingTable,
  gameOverTable,
  winTable,
}
