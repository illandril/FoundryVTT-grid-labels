const COLUMN_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const toExcelColumn = (column: number): string => {
  if (column < 0) {
    return toExcelColumn(Math.abs(column + 1)).toLowerCase();
  }
  let letters = '';
  let x = column;
  while (x >= 0) {
    const letterIndex = x % 26;
    const letter = COLUMN_LETTERS[letterIndex];
    letters = letter + letters;
    x = Math.floor(x / 26) - 1;
  }
  return letters;
};

export default toExcelColumn;
