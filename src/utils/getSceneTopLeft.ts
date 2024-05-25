import type { GridDetails } from './getCurrentGridDetails';

const getSceneTopLeft = ({ scene, dimensions }: GridDetails) => {
  const { sceneX, sceneY } = dimensions;

  return {
    x: sceneX + scene.background.offsetX,
    y: sceneY + scene.background.offsetY,
  };
};

export default getSceneTopLeft;
