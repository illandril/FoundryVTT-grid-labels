import formatCell from '../utils/formatCell';
import type { GridDetails } from '../utils/getCurrentGridDetails';
import getSceneTopLeft from '../utils/getSceneTopLeft';

import container, { setScale } from './container';

export const repositionSquareGrid = (gridDetails: GridDetails<foundry.grid.SquareGrid>) => {
  const { sceneWidth, sceneHeight, size } = gridDetails.dimensions;

  const { x, y } = game.canvas.clientCoordinatesFromCanvas(getSceneTopLeft(gridDetails));

  container.style.left = `${x}px`;
  container.style.top = `${y}px`;

  const scaleX = gridDetails.stage.scale.x ?? 1;
  const numRows = Math.ceil(sceneWidth / size);
  const width = scaleX * numRows * size;
  container.style.width = `${width}px`;

  const scaleY = gridDetails.stage.scale.y ?? 1;
  const numCols = Math.ceil(sceneHeight / size);
  const height = scaleY * numCols * size;
  container.style.height = `${height}px`;

  setScale(scaleX, scaleY);
};

export const setupSquareGridLabels = (gridDetails: GridDetails<foundry.grid.SquareGrid>) => {
  const dimensions = gridDetails.dimensions;
  const { x: paddingX, y: paddingY, width: sceneWidth, height: sceneHeight } = dimensions.sceneRect;
  const size = dimensions.size;
  const numCols = Math.ceil(sceneWidth / size);
  const numRows = Math.ceil(sceneHeight / size);
  container.style.left = `${paddingX}px`;
  container.style.top = `${paddingY}px`;
  container.style.width = `${numCols * size}px`;
  container.style.height = `${numRows * size}px`;

  container.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;
  container.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;
  for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
    for (let colIndex = 0; colIndex < numCols; colIndex++) {
      const textElem = document.createElement('div');
      textElem.appendChild(document.createTextNode(formatCell(gridDetails, colIndex, rowIndex)));
      container.appendChild(textElem);
    }
  }
};
