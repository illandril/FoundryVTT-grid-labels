import module from '../module';
import emptyNode from '../utils/emptyNode';

import { cssRuler } from './container';

const overlayClass = cssRuler.child('overlay');
const labelClass = cssRuler.child('label');

const createCell = () => {
  const cell = document.createElement('div');

  const overlayElem = document.createElement('div');
  overlayElem.classList.add(overlayClass);
  cell.appendChild(overlayElem);

  const textElem = document.createElement('div');
  textElem.classList.add(labelClass);
  cell.appendChild(textElem);

  return cell;
};

export const createCells = ({ edge }: { edge: HTMLDivElement }, numCells: number, createLabel: (cell: number) => string) => {
  for (let row = 0; row < numCells; row++) {
    let cell = edge.children[row];
    if (!cell) {
      cell = createCell();
      edge.appendChild(cell);
    }
    const textElem = cell.querySelector(`.${labelClass}`);
    if (!textElem) {
      module.logger.error('Could not find label element', cell, labelClass);
    } else {
      emptyNode(textElem);
      textElem.appendChild(document.createTextNode(createLabel(row)));
    }
  }

  while (edge.children.length > numCells) {
    edge.removeChild(edge.lastChild!);
  }
};
