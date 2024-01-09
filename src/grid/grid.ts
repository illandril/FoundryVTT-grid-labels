import module from '../module';
import emptyNode from '../utils/emptyNode';
import container, { hide, setScale, show } from './container';
import './grid.scss';
import './hotkey';
import { setupSquareGridLabels } from './square';

type CanvasType = Canvas & {
  canvasCoordinatesFromClient: (origin: { x: number, y: number }) => { x: number, y: number }
  clientCoordinatesFromCanvas: (origin: { x: number, y: number }) => { x: number, y: number }
};

const repositionGrid = foundry.utils.debounce(() => {
  const canvas = game.canvas as CanvasType;
  const grid = canvas.grid?.grid;
  if (!grid) {
    module.logger.debug('No grid so no grid labels');
    return;
  }
  const stage = canvas.stage;
  if (!stage) {
    module.logger.debug('No stage so no grid labels');
    return;
  }

  const {
    sceneWidth,
    sceneHeight,
    sceneX,
    sceneY,
    size,
  } = grid.options.dimensions;

  const { x, y } = canvas.clientCoordinatesFromCanvas({
    x: sceneX,
    y: sceneY,
  });

  container.style.left = `${x}px`;
  container.style.top = `${y}px`;

  const scaleX = canvas.stage?.scale.x ?? 1;
  const numRows = Math.ceil(sceneWidth / size);
  const width = scaleX * numRows * size;
  container.style.width = `${width}px`;

  const scaleY = canvas.stage?.scale.y ?? 1;
  const numCols = Math.ceil(sceneHeight / size);
  const height = scaleY * numCols * size;
  container.style.height = `${height}px`;

  setScale(scaleX, scaleY);
}, 1);

Hooks.on('canvasPan', () => {
  repositionGrid();
});

Hooks.on('canvasReady', () => {
  const grid = game.canvas.grid;
  if (!grid) {
    module.logger.debug('No grid, so no grid labels');
    hide();
    return;
  }
  if (grid.type !== foundry.CONST.GRID_TYPES.SQUARE) {
    module.logger.debug('Not a square grid, so no grid labels');
    hide();
    return;
  }

  emptyNode(container);
  setupSquareGridLabels(container, grid.grid);
  show();
});
