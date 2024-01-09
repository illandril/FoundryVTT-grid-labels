import { cssRuler } from './container';

const createCell = (label: string) => {
  const cell = document.createElement('div');

  const overlayElem = document.createElement('div');
  overlayElem.classList.add(cssRuler.child('overlay'));
  cell.appendChild(overlayElem);

  const textElem = document.createElement('div');
  textElem.appendChild(document.createTextNode(label));
  textElem.classList.add(cssRuler.child('label'));
  cell.appendChild(textElem);

  return cell;
};

export const createCells = ({ edge }: { edge: HTMLDivElement }, numCells: number, createLabel: (cell: number) => string) => {
  const numShownCells = edge.children.length;
  if (numShownCells < numCells) {
    for (let row = numShownCells; row < numCells; row++) {
      edge.appendChild(createCell(createLabel(row)));
    }
  } else {
    for (let row = numShownCells; row > numCells; row--) {
      edge.removeChild(edge.lastChild!);
    }
  }
};
