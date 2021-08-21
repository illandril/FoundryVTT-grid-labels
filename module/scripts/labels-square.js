const COLUMN_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const toColumnLetters = (x) => {
  let letters = '';
  while (x >= 0) {
    const letterIndex = x % 26;
    const letter = COLUMN_LETTERS[letterIndex];
    letters = letter + letters;
    x = Math.floor(x / 26) - 1;
  }
  return letters;
};

const setupSquareGridLabels = (gridElem, grid) => {
  const { paddingX, paddingY, size, sceneHeight, sceneWidth } = grid.options.dimensions;
  gridElem.style.margin = `${paddingY}px ${paddingX}px`;

  const nx = Math.floor(sceneWidth / size);
  const ny = Math.ceil(sceneHeight / size);
  gridElem.style.gridTemplateColumns = '1fr';
  gridElem.style.gridTemplateRows = `repeat(${ny}, 1fr)`;
  for (let iy = 0; iy < ny; iy++) {
    const rowElem = document.createElement('div');
    rowElem.style.gridTemplateColumns = `repeat(${nx}, 1fr)`;
    gridElem.appendChild(rowElem);
    for (let ix = 0; ix < nx; ix++) {
      const textElem = document.createElement('div');
      textElem.appendChild(document.createTextNode(`${toColumnLetters(ix)}${iy + 1}`));
      rowElem.appendChild(textElem);
    }
  }
};

export default setupSquareGridLabels;
