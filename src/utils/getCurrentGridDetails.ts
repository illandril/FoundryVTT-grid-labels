import module from '../module';

export type GridDetails<T extends foundry.grid.BaseGrid = foundry.grid.BaseGrid> = {
  gridLayer: GridLayer;
  grid: T;
  stage: NonNullable<Canvas['stage']>;
  scene: Scene;
  dimensions: SceneDimensions;
};

export const isSquare = (
  gridDetails: GridDetails<foundry.grid.BaseGrid>,
): gridDetails is GridDetails<foundry.grid.SquareGrid> => {
  return gridDetails.grid.type === foundry.CONST.GRID_TYPES.SQUARE;
};

export const isHex = (
  gridDetails: GridDetails<foundry.grid.BaseGrid>,
): gridDetails is GridDetails<foundry.grid.HexagonalGrid> => {
  return gridDetails.grid.isHexagonal;
};

const getCurrentGridDetails = (): GridDetails<foundry.grid.BaseGrid> | null => {
  const gridLayer = game.canvas.interface?.grid;
  const grid = game.canvas.grid;
  const stage = game.canvas.stage;
  const scene = game.canvas.scene;
  const dimensions = game.canvas.dimensions;
  if (!(grid && stage && scene && gridLayer && dimensions)) {
    module.logger.debug(
      'No grid, stage, scene, gridLayer, and/or dimensions',
      !!grid,
      !!stage,
      !!scene,
      !!gridLayer,
      !!dimensions,
      game.canvas,
    );
    return null;
  }

  return {
    gridLayer,
    grid,
    stage,
    scene,
    dimensions,
  };
};

export default getCurrentGridDetails;
