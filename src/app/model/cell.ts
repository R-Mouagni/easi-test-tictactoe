export interface Cell {
  row: number;
  col: number;
  value: string;
  isClicked: boolean;
  isWinningCell: boolean;
  isDrawCell: boolean;
  isDisabled: boolean;
}
