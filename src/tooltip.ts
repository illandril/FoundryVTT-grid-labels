import { getFormatter } from './utils/formatCell';
import getCurrentGridDetails, { isHex, isSquare } from './utils/getCurrentGridDetails';
import getSceneTopLeft from './utils/getSceneTopLeft';

import module from './module';

import './tooltip.scss';

const TooltipPosition = module.settings.register('tooltipPosition', String, 'bottom-right', {
  scope: 'client',
  hasHint: true,
  choices: ['bottom-right', 'bottom', 'bottom-left', 'left', 'top-left', 'top', 'top-right', 'right'],
});
const ShowTooltipsOnHotkey = module.settings.register('showTooltipsOnHotkey', Boolean, true, {
  scope: 'client',
  hasHint: true,
});

module.settings.registerKeybinding('tooltip',
  () => {
    if (ShowTooltipsOnHotkey.get()) {
      tooltip.ariaHidden = 'false';
    }
  },
  () => {
    if (ShowTooltipsOnHotkey.get()) {
      tooltip.ariaHidden = 'true';
    }
  },
  {
    hasHint: true,
  });

Hooks.once('ready', () => {
  tooltip.ariaHidden = ShowTooltipsOnHotkey.get() ? 'true' : 'false';
});

const tooltip = document.createElement('div');
tooltip.classList.add(module.cssPrefix.child('tooltip'));
tooltip.ariaHidden = 'true';

const container = document.createElement('div');
container.classList.add(module.cssPrefix.child('tooltip-container'));
container.appendChild(tooltip);

module.settings.register('tooltipFontSize', Number, 1, {
  scope: 'client',
  hasHint: true,
  range: { min: 0.5, max: 5, step: 0.1 },
  onChange: (value) => {
    container.style.setProperty('--font-size', `${value}rem`);
  },
  callOnChangeOnInit: true,
});

Hooks.on('renderTokenHUD', () => {
  if (!ShowTooltipsOnHotkey.get()) {
    tooltip.ariaHidden = 'true';
  }
});

Hooks.once('ready', () => {
  const board = document.getElementById('board');
  if (!board) {
    module.logger.error('Tooltip initialization failed: no #board element found');
    return;
  }
  board.addEventListener('mouseleave', () => {
    if (!ShowTooltipsOnHotkey.get()) {
      tooltip.ariaHidden = 'true';
    }
  });
  board.addEventListener('mouseenter', () => {
    if (!ShowTooltipsOnHotkey.get()) {
      tooltip.ariaHidden = 'false';
    }
  });
  board.addEventListener('mousemove', (event) => {
    const tooltipPosition = TooltipPosition.get();
    container.setAttribute('data-position', tooltipPosition);
    // tooltip.ariaHidden = 'false';
    const gridDetails = getCurrentGridDetails();
    if (!gridDetails) {
      module.logger.debug('No grid so no grid tooltips');
      return;
    }
    if (!isSquare(gridDetails) && !isHex(gridDetails)) {
      module.logger.debug('Not a square or hex grid, so no tooltips');
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const coordinate = game.canvas.canvasCoordinatesFromClient({ x, y });
    const topLeft = getSceneTopLeft(gridDetails);
    const [row, col] = gridDetails.grid.getGridPositionFromPixels(coordinate.x - topLeft.x, coordinate.y - topLeft.y);

    tooltip.textContent = getFormatter(gridDetails.grid).formatCell(col, row);
    container.style.left = `${x}px`;
    container.style.top = `${y}px`;
  });

  document.body.appendChild(container);
});
