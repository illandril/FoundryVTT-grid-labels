import { CSS_PREFIX } from './module.js';
import Settings, { SETTINGS_UPDATED } from './settings.js';

import setupSquareGridLabels from './labels-square.js';

const emptyNode = (node) => {
  while (node.firstChild) {
    node.removeChild(node.lastChild);
  }
};

const gridElem = document.createElement('div');
gridElem.classList.add(`${CSS_PREFIX}grid-overlay`);

Hooks.on('canvasReady', () => {
  emptyNode(gridElem);
  const hudElem = document.getElementById('hud');

  const grid = game?.canvas?.grid?.grid;
  if (grid instanceof SquareGrid) {
    hudElem.appendChild(gridElem);
    setupSquareGridLabels(gridElem, grid);
  } else {
    hudElem.removeChild(gridElem);
  }
});

const updateVisibility = () => {
  if (Settings.ShowGrid.get()) {
    gridElem.classList.add(`show`);
  } else {
    gridElem.classList.remove(`show`);
  }
};

Hooks.on(SETTINGS_UPDATED, () => {
  updateVisibility();
});

Hooks.once('ready', () => {
  updateVisibility();
});
