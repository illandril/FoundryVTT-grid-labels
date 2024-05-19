import module from '../module';

import { ShowRulers } from './container';

module.settings.registerKeybinding(
  'toggleRulers',
  () => {
    ShowRulers.set(!ShowRulers.get());
  },
  () => undefined, // Nothing to do onUp
  {
    hasHint: true,
  },
);
