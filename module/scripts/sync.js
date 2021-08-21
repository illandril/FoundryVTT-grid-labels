import { KEY as MODULE_KEY } from './module.js';
import Settings from './settings.js';

const SOCKET_KEY = `module.${MODULE_KEY}`;
const SOCKET_TYPE__SHOW_GRID = 0;

export const syncSettings = (all) => {
  if (all && game.user.isGM) {
    game.socket.emit(
      SOCKET_KEY,
      {
        id: randomID(),
        type: SOCKET_TYPE__SHOW_GRID,
        target: '',
        payload: {
          value: Settings.ShowGrid.get(),
        },
      }
    );
  }
};

Hooks.once('ready', () => {
  game.socket.on(SOCKET_KEY, (data) => {
    if(data.type === SOCKET_TYPE__SHOW_GRID) {
      Settings.ShowGrid.set(!!data.payload.value);
    }
  });
});
