import module from '../module';
import toExcelColumn from '../utils/toExcelColumn';
import toExcelRow from '../utils/toExcelRow';
import { createCells } from './cell';
import { hide, show } from './container';
import { rulerHorizontal, rulerVertical } from './edges';
import './hotkey';
import './rulers.scss';

type CanvasType = Canvas & {
  canvasCoordinatesFromClient: (origin: { x: number, y: number }) => { x: number, y: number }
  clientCoordinatesFromCanvas: (origin: { x: number, y: number }) => { x: number, y: number }
};

const repositionRulers = foundry.utils.debounce(() => {
  const canvas = game.canvas as CanvasType;
  const grid = canvas.grid?.grid;
  if (!grid) {
    module.logger.debug('No grid so no rulers');
    return;
  }
  const stage = canvas.stage;
  if (!stage) {
    module.logger.debug('No stage so no rulers');
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
  rulerHorizontal.edge.style.left = `${x}px`;
  rulerVertical.edge.style.top = `${y}px`;

  const scaleX = canvas.stage?.scale.x ?? 1;
  const numRows = Math.ceil(sceneWidth / size);
  const width = scaleX * numRows * size;
  rulerHorizontal.edge.style.width = `${width}px`;

  const scaleY = canvas.stage?.scale.y ?? 1;
  const numCols = Math.ceil(sceneHeight / size);
  const height = scaleY * numCols * size;
  rulerVertical.edge.style.height = `${height}px`;
}, 1);

Hooks.on('canvasPan', () => {
  repositionRulers();
});

Hooks.on('canvasReady', () => {
  const grid = game.canvas.grid;
  if (!grid) {
    module.logger.debug('No grid, so no rulers');
    hide();
    return;
  }
  if (grid.type !== foundry.CONST.GRID_TYPES.SQUARE) {
    module.logger.debug('Not a square grid, so no rulers');
    hide();
    return;
  }

  const {
    sceneWidth,
    sceneHeight,
    size,
  } = grid.grid.options.dimensions;

  const numCols = Math.ceil(sceneWidth / size);
  createCells(rulerHorizontal, numCols, toExcelColumn);

  const numRows = Math.ceil(sceneHeight / size);
  createCells(rulerVertical, numRows, toExcelRow);

  show();
});
