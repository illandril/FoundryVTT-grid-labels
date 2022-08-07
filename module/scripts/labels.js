import { log, CSS_PREFIX } from './module.js';
import Settings, { SETTINGS_UPDATED } from './settings.js';

import setupSquareGridLabels from './labels-square.js';

const emptyNode = (node) => {
  while (node.firstChild) {
    node.removeChild(node.lastChild);
  }
};

const gridElem = document.createElement('div');
gridElem.classList.add(`${CSS_PREFIX}grid-overlay`);

Hooks.on('renderHeadsUpDisplay', () => {
  emptyNode(gridElem);

  const grid = game?.canvas?.grid?.grid;
  if (grid instanceof SquareGrid) {
    log.info('Appending grid');
    const hudElem = document.getElementById('hud');
    hudElem.appendChild(gridElem);
    setupSquareGridLabels(gridElem, grid);
  } else {
    log.info('Removing grid');
    gridElem.parentNode?.removeChild(gridElem);
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
