import { getFormatter, getRulerModifiers } from '../utils/formatCell';
import type { GridDetails } from '../utils/getCurrentGridDetails';
import getSceneTopLeft from '../utils/getSceneTopLeft';
import normalizeHex from '../utils/normalizeHex';

import { createCells } from './cell';
import { rulerHorizontal, rulerVertical } from './edges';

export const repositionHexRulers = (gridDetails: GridDetails<foundry.grid.HexagonalGrid>) => {
  const { grid, stage } = gridDetails;
  const { cellHeight, cellWidth, numCols, numRows } = normalizeHex(gridDetails);

  const { x, y } = game.canvas.clientCoordinatesFromCanvas(getSceneTopLeft(gridDetails));

  const scaleX = stage.scale.x ?? 1;
  const scaleY = stage.scale.y ?? 1;
  const offsetX = (grid.columns ? cellWidth / 6 : -cellWidth / 4) * scaleX;
  const offsetY = (grid.columns ? -cellHeight / 4 : cellHeight / 6) * scaleY;

  rulerHorizontal.edge.style.left = `${x + offsetX}px`;
  rulerVertical.edge.style.top = `${y + offsetY}px`;

  const width = scaleX * numCols * cellWidth;
  rulerHorizontal.edge.style.width = `${width}px`;

  const height = scaleY * numRows * cellHeight;
  rulerVertical.edge.style.height = `${height}px`;
};

export const setupHexRulers = (gridDetails: GridDetails<foundry.grid.HexagonalGrid>) => {
  const modifiers = getRulerModifiers(gridDetails);
  const formatter = getFormatter(gridDetails.grid);
  const { numCols, numRows } = normalizeHex(gridDetails);

  createCells(rulerHorizontal, numCols * modifiers.column.multiplier, (index) =>
    formatter.formatColumn(index + modifiers.column.offset),
  );
  createCells(rulerVertical, numRows * modifiers.row.multiplier, (index) =>
    formatter.formatRow(index + modifiers.row.offset),
  );
};
