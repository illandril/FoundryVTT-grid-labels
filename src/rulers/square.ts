import { getFormatter, getRulerModifiers } from '../utils/formatCell';
import type { GridDetails } from '../utils/getCurrentGridDetails';
import getSceneTopLeft from '../utils/getSceneTopLeft';

import { createCells } from './cell';
import { rulerHorizontal, rulerVertical } from './edges';

export const repositionSquareRulers = (gridDetails: GridDetails<SquareGrid>) => {
  const { grid, stage } = gridDetails;
  const { sceneWidth, sceneHeight, size } = grid.options.dimensions;

  const { x, y } = game.canvas.clientCoordinatesFromCanvas(getSceneTopLeft(gridDetails));
  rulerHorizontal.edge.style.left = `${x}px`;
  rulerVertical.edge.style.top = `${y}px`;

  const scaleX = stage.scale.x ?? 1;
  const numCols = Math.ceil(sceneWidth / size);
  const width = scaleX * numCols * size;
  rulerHorizontal.edge.style.width = `${width}px`;

  const scaleY = stage.scale.y ?? 1;
  const numRows = Math.ceil(sceneHeight / size);
  const height = scaleY * numRows * size;
  rulerVertical.edge.style.height = `${height}px`;
};

export const setupSquareRulers = (gridDetails: GridDetails<SquareGrid>) => {
  const modifiers = getRulerModifiers(gridDetails);
  const formatter = getFormatter(gridDetails.grid);
  const { sceneWidth, sceneHeight, size } = gridDetails.grid.options.dimensions;

  const numCols = Math.ceil(sceneWidth / size);
  createCells(rulerHorizontal, numCols * modifiers.column.multiplier, (index) =>
    formatter.formatColumn(index + modifiers.column.offset),
  );

  const numRows = Math.ceil(sceneHeight / size);
  createCells(rulerVertical, numRows * modifiers.row.multiplier, (index) =>
    formatter.formatRow(index + modifiers.row.offset),
  );
};
