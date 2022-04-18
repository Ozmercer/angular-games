export interface GOLCell {
  row: number;
  col: number;
  alive: boolean;
}

export enum BoardSide {
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
  All = 'all',
  X = 'x',
}
