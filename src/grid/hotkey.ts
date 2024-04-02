import module from '../module';

import { ShowGrid } from './container';

module.settings.registerKeybinding('toggleGrid',
  () => {
    ShowGrid.set(!ShowGrid.get());
  },
  () => undefined, // Nothing to do onUp
  {
    hasHint: true,
  });
