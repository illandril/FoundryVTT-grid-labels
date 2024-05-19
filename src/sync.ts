import { ShowGrid } from './grid/container';
import { ShowRulers } from './rulers/container';

import module from './module';

enum SocketType {
  ShowGrid = 0,
  ShowRulers = 1,
}

type SocketData = {
  id: string;
} & {
  type: SocketType.ShowGrid | SocketType.ShowRulers;
  payload: { value: boolean };
};

const socket = module.initializeSocket<SocketData>();

export const syncShowGrid = (all?: boolean) => {
  if (all && game.user?.isGM) {
    socket.emit({
      id: foundry.utils.randomID(),
      type: SocketType.ShowGrid,
      payload: {
        value: ShowGrid.get(),
      },
    });
  }
};

export const syncShowRulers = (all?: boolean) => {
  if (all && game.user?.isGM) {
    socket.emit({
      id: foundry.utils.randomID(),
      type: SocketType.ShowRulers,
      payload: {
        value: ShowRulers.get(),
      },
    });
  }
};

Hooks.once('ready', () => {
  socket.on((data) => {
    if (data.type === SocketType.ShowGrid) {
      ShowGrid.set(!!data.payload.value);
    } else if (data.type === SocketType.ShowRulers) {
      ShowRulers.set(!!data.payload.value);
    }
  });
});
