import { ShowGrid } from './grid/container';
import { ShowRulers } from './rulers/container';

import module from './module';

enum SocketType {
  SHOW_GRID = 0,
  SHOW_RULERS = 1,
}

type SocketData = {
  id: string
} & (
  | {
    type: SocketType.SHOW_GRID | SocketType.SHOW_RULERS
    payload: { value: boolean }
  }
);

const socket = module.initializeSocket<SocketData>();

export const syncShowGrid = (all: boolean) => {
  if (all && game.user?.isGM) {
    socket.emit(
      {
        id: foundry.utils.randomID(),
        type: SocketType.SHOW_GRID,
        payload: {
          value: ShowGrid.get(),
        },
      },
    );
  }
};

export const syncShowRulers = (all: boolean) => {
  if (all && game.user?.isGM) {
    socket.emit(
      {
        id: foundry.utils.randomID(),
        type: SocketType.SHOW_RULERS,
        payload: {
          value: ShowRulers.get(),
        },
      },
    );
  }
};

Hooks.once('ready', () => {
  socket.on((data) => {
    if (data.type === SocketType.SHOW_GRID) {
      ShowGrid.set(!!data.payload.value);
    } else if (data.type === SocketType.SHOW_RULERS) {
      ShowRulers.set(!!data.payload.value);
    }
  });
});
