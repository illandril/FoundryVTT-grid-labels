import module from '../module';
import emptyNode from '../utils/emptyNode';
import { onFormatChage } from '../utils/formatCell';
import container, { hide, show } from './container';
import './grid.scss';
import { repositionHexGrid, setupHexGridLabels } from './hex';
import './hotkey';
import { repositionSquareGrid, setupSquareGridLabels } from './square';

const repositionGrid = foundry.utils.debounce(() => {
  const grid = game.canvas.grid;
  if (!grid) {
    module.logger.debug('No grid so no grid labels');
    return;
  }
  const stage = game.canvas.stage;
  if (!stage) {
    module.logger.debug('No stage so no grid labels');
    return;
  }

  if (grid.type === foundry.CONST.GRID_TYPES.SQUARE) {
    repositionSquareGrid(grid.grid as SquareGrid);
  } else if (grid.isHex) {
    repositionHexGrid(grid.grid as HexagonalGrid);
  }
}, 1);

const setupGrid = () => {
  hide();
  emptyNode(container);
  container.removeAttribute('data-type');

  const grid = game.canvas.grid;
  if (!grid) {
    module.logger.debug('No grid, so no grid labels');
    hide();
    return;
  }
  let type: string;
  if (grid.type === foundry.CONST.GRID_TYPES.SQUARE) {
    type = 'square';
    setupSquareGridLabels(grid.grid as SquareGrid);
  } else if (grid.isHex) {
    type = 'hex';
    container.setAttribute('data-type', 'hex');
    setupHexGridLabels(grid.grid as HexagonalGrid);
  } else {
    module.logger.debug('Not a square or hex grid, so no grid labels');
    hide();
    return;
  }
  container.setAttribute('data-type', type);
  show();
  repositionGrid();
};

Hooks.on('canvasPan', () => {
  repositionGrid();
});

onFormatChage(setupGrid);
Hooks.on('canvasReady', () => {
  setupGrid();
});
