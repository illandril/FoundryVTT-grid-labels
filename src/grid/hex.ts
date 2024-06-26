import formatCell from '../utils/formatCell';
import type { GridDetails } from '../utils/getCurrentGridDetails';
import getSceneTopLeft from '../utils/getSceneTopLeft';
import normalizeHex from '../utils/normalizeHex';

import container, { setScale } from './container';

export const repositionHexGrid = (gridDetails: GridDetails<foundry.grid.HexagonalGrid>) => {
  const { grid, stage } = gridDetails;
  const { cellWidth, cellHeight, numCols, numRows } = normalizeHex(gridDetails);

  const { x, y } = game.canvas.clientCoordinatesFromCanvas(getSceneTopLeft(gridDetails));

  const scaleX = stage.scale.x ?? 1;
  const scaleY = stage.scale.y ?? 1;

  const offsetX = grid.columns ? (cellWidth / 6) * scaleX : 0;
  const offsetY = grid.columns ? 0 : (cellHeight / 6) * scaleY;
  container.style.left = `${x + offsetX}px`;
  container.style.top = `${y + offsetY}px`;

  const width = scaleX * numCols * cellWidth;
  container.style.width = `${width}px`;

  const height = scaleY * numRows * cellHeight;
  container.style.height = `${height}px`;

  setScale(scaleX, scaleY);
};

export const setupHexGridLabels = (gridDetails: GridDetails<foundry.grid.HexagonalGrid>) => {
  const grid = gridDetails.grid;
  const { numCols, numRows } = normalizeHex(gridDetails);

  container.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;
  container.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;
  for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
    for (let colIndex = 0; colIndex < numCols; colIndex++) {
      const isOffset = (grid.columns ? colIndex : rowIndex) % 2 === (grid.even ? 1 : 0);
      const textElem = document.createElement('div');
      textElem.setAttribute('data-offset', `${isOffset}`);
      textElem.setAttribute('data-columns', `${grid.columns}`);
      textElem.appendChild(document.createTextNode(formatCell(gridDetails, colIndex, rowIndex)));
      container.appendChild(textElem);
    }
  }
};
