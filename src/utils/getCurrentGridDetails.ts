import module from '../module';

export type GridDetails<T extends BaseGrid = BaseGrid> = {
  gridLayer: GridLayer;
  grid: T;
  stage: NonNullable<Canvas['stage']>;
  scene: Scene;
};

export const isSquare = (gridDetails: GridDetails<BaseGrid>): gridDetails is GridDetails<SquareGrid> => {
  return gridDetails.gridLayer.type === foundry.CONST.GRID_TYPES.SQUARE;
};

export const isHex = (gridDetails: GridDetails<BaseGrid>): gridDetails is GridDetails<HexagonalGrid> => {
  return gridDetails.gridLayer.isHex;
};

const getCurrentGridDetails = (): GridDetails<BaseGrid> | null => {
  const gridLayer = game.canvas.grid;
  const grid = gridLayer?.grid;
  const stage = game.canvas.stage;
  const scene = game.canvas.scene;
  if (!(grid && stage && scene)) {
    module.logger.debug('No grid, stage, and/or scene', !!grid, !!stage, !!scene, game.canvas);
    return null;
  }

  return {
    gridLayer,
    grid,
    stage,
    scene,
  };
};

export default getCurrentGridDetails;
