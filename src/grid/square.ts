import toExcelColumn from '../utils/toExcelColumn';

export const setupSquareGridLabels = (gridElem: HTMLElement, grid: BaseGrid) => {
  const dimensions = grid.options.dimensions;
  const { x: paddingX, y: paddingY, width: sceneWidth, height: sceneHeight } = dimensions.sceneRect;
  const size = dimensions.size;
  const nx = Math.ceil(sceneWidth / size);
  const ny = Math.ceil(sceneHeight / size);
  gridElem.style.left = `${paddingX}px`;
  gridElem.style.top = `${paddingY}px`;
  gridElem.style.width = `${nx * size}px`;
  gridElem.style.height = `${ny * size}px`;

  gridElem.style.gridTemplateRows = `repeat(${ny}, 1fr)`;
  gridElem.style.gridTemplateColumns = `repeat(${nx}, 1fr)`;
  for (let iy = 0; iy < ny; iy++) {
    // const rowElem = document.createElement('div');
    // gridElem.appendChild(rowElem);
    for (let ix = 0; ix < nx; ix++) {
      const textElem = document.createElement('div');
      textElem.appendChild(document.createTextNode(`${toExcelColumn(ix)}${iy + 1}`));
      gridElem.appendChild(textElem);
    }
  }
};
