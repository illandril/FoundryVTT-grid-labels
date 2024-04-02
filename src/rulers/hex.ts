import { getFormatter } from '../utils/formatCell';
import type { GridDetails } from '../utils/getCurrentGridDetails';
import getSceneTopLeft from '../utils/getSceneTopLeft';
import normalizeHex from '../utils/normalizeHex';

import { createCells } from './cell';
import { rulerHorizontal, rulerVertical } from './edges';

export const repositionHexRulers = (gridDetails: GridDetails<HexagonalGrid>) => {
  const { grid, stage } = gridDetails;
  const {
    cellHeight,
    cellWidth,
    numCols,
    numRows,
  } = normalizeHex(grid);

  const { x, y } = game.canvas.clientCoordinatesFromCanvas(getSceneTopLeft(gridDetails));

  const scaleX = stage.scale.x ?? 1;
  const scaleY = stage.scale.y ?? 1;
  const offsetX = (grid.columnar ? cellWidth / 6 : -cellWidth / 4) * scaleX;
  const offsetY = (grid.columnar ? -cellHeight / 4 : cellHeight / 6) * scaleY;

  rulerHorizontal.edge.style.left = `${x + offsetX}px`;
  rulerVertical.edge.style.top = `${y + offsetY}px`;

  const width = scaleX * numCols * cellWidth;
  rulerHorizontal.edge.style.width = `${width}px`;

  const height = scaleY * numRows * cellHeight;
  rulerVertical.edge.style.height = `${height}px`;
};

export const setupHexRulers = ({ grid }: GridDetails<HexagonalGrid>) => {
  const formatter = getFormatter(grid);
  const {
    numCols,
    numRows,
  } = normalizeHex(grid);

  createCells(rulerHorizontal, numCols, (index) => formatter.formatColumn(index));
  createCells(rulerVertical, numRows, (index) => formatter.formatRow(index));
};
