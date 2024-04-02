import module from '../module';
import { onFormatChage } from '../utils/formatCell';
import getCurrentGridDetails, { isHex, isSquare } from '../utils/getCurrentGridDetails';

import container, { hide, show } from './container';
import { repositionHexRulers, setupHexRulers } from './hex';
import './hotkey';
import { repositionSquareRulers, setupSquareRulers } from './square';

import './rulers.scss';

const repositionRulers = foundry.utils.debounce(() => {
  const gridDetails = getCurrentGridDetails();
  if (!gridDetails) {
    module.logger.debug('No grid so no grid rulers');
    return;
  }

  if (isSquare(gridDetails)) {
    repositionSquareRulers(gridDetails);
  } else if (isHex(gridDetails)) {
    repositionHexRulers(gridDetails);
  }
}, 1);

const setupRulers = () => {
  hide();
  container.removeAttribute('data-type');

  const gridDetails = getCurrentGridDetails();
  if (!gridDetails) {
    module.logger.debug('No grid, so no rulers');
    hide();
    return;
  }

  let type: string;
  if (isSquare(gridDetails)) {
    type = 'square';
    setupSquareRulers(gridDetails);
  } else if (isHex(gridDetails)) {
    type = 'hex';
    setupHexRulers(gridDetails);
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
