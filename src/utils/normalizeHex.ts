import type { GridDetails } from './getCurrentGridDetails';

const normalizeHex = ({ grid, dimensions }: GridDetails<foundry.grid.HexagonalGrid>) => {
  const { sceneWidth, sceneHeight } = dimensions;
  const cellWidth = grid.sizeX * (grid.columns ? 0.75 : 1);
  const cellHeight = grid.sizeY * (grid.columns ? 1 : 0.75);
  const numCols = Math.ceil(sceneWidth / cellWidth);
  const numRows = Math.ceil(sceneHeight / cellHeight);

  return { cellWidth, cellHeight, numCols, numRows };
};

export default normalizeHex;
