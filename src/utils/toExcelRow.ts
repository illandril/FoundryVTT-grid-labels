const toExcelRow = (row: number): string => {
  if (row < 0) {
    return `(${Math.abs(row)})`;
  }
  return `${row + 1}`;
};

export default toExcelRow;
