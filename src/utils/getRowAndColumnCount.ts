const getRowAndColumnCount = (grid: BaseGrid) => {
  const {
    sceneWidth,
    sceneHeight,
    size,
  } = grid.options.dimensions;

  const nx = Math.ceil(sceneWidth / size);
  const ny = Math.ceil(sceneHeight / size);

  return {
    rows: ny,
    cols: nx,
  };
};

export default getRowAndColumnCount;
