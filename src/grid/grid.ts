import module from '../module';
import emptyNode from '../utils/emptyNode';
import { onFormatChage } from '../utils/formatCell';
import getCurrentGridDetails, { isHex, isSquare } from '../utils/getCurrentGridDetails';

import container, { hide, show } from './container';
import { repositionHexGrid, setupHexGridLabels } from './hex';
import './hotkey';
import { repositionSquareGrid, setupSquareGridLabels } from './square';

import './grid.scss';

const repositionGrid = foundry.utils.debounce(() => {
  const gridDetails = getCurrentGridDetails();
  if (!gridDetails) {
    module.logger.debug('No grid so no grid labels');
    return;
  }

  if (isSquare(gridDetails)) {
    repositionSquareGrid(gridDetails);
  } else if (isHex(gridDetails)) {
    repositionHexGrid(gridDetails);
  }
}, 1);

const setupGrid = () => {
  hide();
  emptyNode(container);
  container.removeAttribute('data-type');

  const gridDetails = getCurrentGridDetails();
  if (!gridDetails) {
    module.logger.debug('No grid, so no grid labels');
    hide();
    return;
  }
  let type: string;
  if (isSquare(gridDetails)) {
    type = 'square';
    setupSquareGridLabels(gridDetails);
  } else if (isHex(gridDetails)) {
    type = 'hex';
    container.setAttribute('data-type', 'hex');
    setupHexGridLabels(gridDetails);
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
