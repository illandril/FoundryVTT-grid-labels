import type { GridDetails } from './getCurrentGridDetails';

const getSceneTopLeft = ({ grid, scene }: GridDetails) => {
  const {
    sceneX,
    sceneY,
  } = grid.options.dimensions;

  return {
    x: sceneX + scene.background.offsetX,
    y: sceneY + scene.background.offsetY,
  };
};

export default getSceneTopLeft;
