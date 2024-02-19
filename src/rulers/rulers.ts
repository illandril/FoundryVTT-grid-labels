import module from '../module';
import { onFormatChage } from '../utils/formatCell';
import container, { hide, show } from './container';
import { repositionHexRulers, setupHexRulers } from './hex';
import './hotkey';
import './rulers.scss';
import { repositionSquareRulers, setupSquareRulers } from './square';

const repositionRulers = foundry.utils.debounce(() => {
  const grid = game.canvas.grid;
  if (!grid) {
    module.logger.debug('No grid so no grid rulers');
    return;
  }
  const stage = game.canvas.stage;
  if (!stage) {
    module.logger.debug('No stage so no grid rulers');
    return;
  }

  if (grid.type === foundry.CONST.GRID_TYPES.SQUARE) {
    repositionSquareRulers(grid.grid as SquareGrid);
  } else if (grid.isHex) {
    repositionHexRulers(grid.grid as HexagonalGrid);
  }
}, 1);

const setupRulers = () => {
  hide();
  container.removeAttribute('data-type');

  const grid = game.canvas.grid;
  if (!grid) {
    module.logger.debug('No grid, so no rulers');
    hide();
    return;
  }

  let type: string;
  if (grid.type === foundry.CONST.GRID_TYPES.SQUARE) {
    type = 'square';
    setupSquareRulers(grid.grid as SquareGrid);
  } else if (grid.isHex) {
    type = 'hex';
    setupHexRulers(grid.grid as HexagonalGrid);
  } else {
    module.logger.debug('Not a square or hex grid, so no rulers');
    hide();
    return;
  }

  container.setAttribute('data-type', type);
  repositionRulers();
  show();
};

Hooks.on('canvasPan', () => {
  repositionRulers();
});

onFormatChage(setupRulers);
Hooks.on('canvasReady', () => {
  setupRulers();
});
