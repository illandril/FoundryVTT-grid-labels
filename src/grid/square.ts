import { getFormatter } from '../utils/formatCell';
import container, { setScale } from './container';

export const repositionSquareGrid = (grid: SquareGrid) => {
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

  container.style.left = `${x}px`;
  container.style.top = `${y}px`;

  const scaleX = game.canvas.stage?.scale.x ?? 1;
  const numRows = Math.ceil(sceneWidth / size);
  const width = scaleX * numRows * size;
  container.style.width = `${width}px`;

  const scaleY = game.canvas.stage?.scale.y ?? 1;
  const numCols = Math.ceil(sceneHeight / size);
  const height = scaleY * numCols * size;
  container.style.height = `${height}px`;

  setScale(scaleX, scaleY);
};

export const setupSquareGridLabels = (grid: SquareGrid) => {
  const formatter = getFormatter(grid);
  const dimensions = grid.options.dimensions;
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
      textElem.appendChild(document.createTextNode(formatter.formatCell(colIndex, rowIndex)));
      container.appendChild(textElem);
    }
  }
};
