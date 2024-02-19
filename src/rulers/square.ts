import { getFormatter } from '../utils/formatCell';
import { createCells } from './cell';
import { rulerHorizontal, rulerVertical } from './edges';

export const repositionSquareRulers = (grid: SquareGrid) => {
  const {
    sceneWidth,
    sceneHeight,
    sceneX,
    sceneY,
    size,
  } = grid.options.dimensions;

  const { x, y } = game.canvas.clientCoordinatesFromCanvas({
    x: sceneX,
    y: sceneY,
  });
  rulerHorizontal.edge.style.left = `${x}px`;
  rulerVertical.edge.style.top = `${y}px`;

  const scaleX = game.canvas.stage?.scale.x ?? 1;
  const numCols = Math.ceil(sceneWidth / size);
  const width = scaleX * numCols * size;
  rulerHorizontal.edge.style.width = `${width}px`;

  const scaleY = game.canvas.stage?.scale.y ?? 1;
  const numRows = Math.ceil(sceneHeight / size);
  const height = scaleY * numRows * size;
  rulerVertical.edge.style.height = `${height}px`;
};

export const setupSquareRulers = (grid: SquareGrid) => {
  const formatter = getFormatter(grid);
  const {
    sceneWidth,
    sceneHeight,
    size,
  } = grid.options.dimensions;

  const numCols = Math.ceil(sceneWidth / size);
  createCells(rulerHorizontal, numCols, (index) => formatter.formatColumn(index));

  const numRows = Math.ceil(sceneHeight / size);
  createCells(rulerVertical, numRows, (index) => formatter.formatRow(index));
};
