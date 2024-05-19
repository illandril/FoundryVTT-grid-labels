const normalizeHex = (grid: HexagonalGrid) => {
  const { sceneWidth, sceneHeight } = grid.options.dimensions;
  const cellWidth = grid.w * (grid.columnar ? 0.75 : 1);
  const cellHeight = grid.h * (grid.columnar ? 1 : 0.75);
  const numCols = Math.ceil(sceneWidth / cellWidth);
  const numRows = Math.ceil(sceneHeight / cellHeight);

  return { cellWidth, cellHeight, numCols, numRows };
};

export default normalizeHex;
