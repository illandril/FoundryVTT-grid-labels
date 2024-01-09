import module from './module';
import './tooltip.scss';
import toExcelColumn from './utils/toExcelColumn';
import toExcelRow from './utils/toExcelRow';

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


type CanvasType = Canvas & {
  canvasCoordinatesFromClient: (origin: { x: number, y: number }) => { x: number, y: number }
  clientCoordinatesFromCanvas: (origin: { x: number, y: number }) => { x: number, y: number }
};

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
  board.addEventListener('mouseleave', (event) => {
    module.logger.debug('mouseleave', event);
    if (!ShowTooltipsOnHotkey.get()) {
      tooltip.ariaHidden = 'true';
    }
  });
  board.addEventListener('mouseenter', (event) => {
    module.logger.debug('mouseenter', event);
    if (!ShowTooltipsOnHotkey.get()) {
      tooltip.ariaHidden = 'false';
    }
  });
  board.addEventListener('mousemove', (event) => {
    const tooltipPosition = TooltipPosition.get();
    module.logger.debug('mousemove', tooltipPosition, event);
    container.setAttribute('data-position', tooltipPosition);
    // tooltip.ariaHidden = 'false';
    const canvas = game.canvas as CanvasType;
    const grid = canvas.grid;
    if (!grid) {
      module.logger.debug('No grid so no grid labels');
      return;
    }
    const dimensions = grid.grid.options.dimensions;
    const x = event.clientX;
    const y = event.clientY;
    const coordinate = canvas.canvasCoordinatesFromClient({ x, y });
    const col = Math.floor(
      (coordinate.x - dimensions.sceneX) / dimensions.size,
    );
    const row = Math.floor(
      (coordinate.y - dimensions.sceneY) / dimensions.size,
    );
    tooltip.textContent = `${toExcelColumn(col)}${toExcelRow(row)}`;
    container.style.left = `${x}px`;
    container.style.top = `${y}px`;
  });

  document.body.appendChild(container);
});
