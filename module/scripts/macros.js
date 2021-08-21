import Settings from './settings.js';
import { syncSettings } from './sync.js';

window.illandril = {
  gridLabels: {
    show: (all) => {
      Settings.ShowGrid.set(true);
      syncSettings(all);
    },
    hide: (all) => {
      Settings.ShowGrid.set(false);
      syncSettings(all);
    },
    toggle: (all) => {
      Settings.ShowGrid.set(!Settings.ShowGrid.get());
      syncSettings(all);
    },
  },
  ...window.illandril,
};
