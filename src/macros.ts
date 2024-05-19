import { ShowGrid } from './grid/container';
import { ShowRulers } from './rulers/container';

import { syncShowGrid, syncShowRulers } from './sync';

type Toggle = {
  show: (all?: boolean) => void;
  hide: (all?: boolean) => void;
  toggle: (all?: boolean) => void;
};

declare global {
  interface Window {
    illandril?: {
      gridLabels: Toggle & {
        grid: Toggle;
        rulers: Toggle;
      };
    };
  }
}

const external = window;

external.illandril = {
  ...(() => {
    const makeToggle = (setting: typeof ShowGrid, sync: typeof syncShowGrid): Toggle => {
      return {
        show: (all) => {
          setting.set(true);
          sync(all);
        },
        hide: (all) => {
          setting.set(false);
          sync(all);
        },
        toggle: (all) => {
          setting.set(!setting.get());
          sync(all);
        },
      };
    };
    const grid = makeToggle(ShowGrid, syncShowGrid);
    return {
      gridLabels: {
        ...grid,
        grid,
        rulers: makeToggle(ShowRulers, syncShowRulers),
      },
    };
  })(),
  ...external.illandril,
};
