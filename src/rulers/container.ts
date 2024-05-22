import module from '../module';

import './rulers.scss';

export const cssRuler = module.cssPrefix.childPrefix('ruler');

const container = document.createElement('div');
container.classList.add(cssRuler.child('container'));

let visible = false;
export const hide = () => {
  visible = false;
  resetAriaHidden();
};

export const show = () => {
  visible = true;
  resetAriaHidden();
};

const resetAriaHidden = () => {
  container.ariaHidden = visible && ShowRulers.get() ? 'false' : 'true';
};

export const ShowRulers = module.settings.register('showRulers', Boolean, false, {
  scope: 'client',
  hasHint: true,
  onChange: resetAriaHidden,
  callOnChangeOnInit: true,
});

export const ShowRulerOverlay = module.settings.register('showRulerOverlay', Boolean, false, {
  scope: 'client',
  hasHint: true,
  onChange: (value) => {
    container.setAttribute('data-overlay', value ? 'true' : 'false');
  },
  callOnChangeOnInit: true,
});

module.settings.register('rulerFontSize', Number, 1, {
  scope: 'client',
  hasHint: true,
  range: { min: 0.5, max: 5, step: 0.1 },
  onChange: (value) => {
    container.style.setProperty('--font-size', `${value}rem`);
  },
  callOnChangeOnInit: true,
});

module.settings.register('rulerTextOddColor', String, '', {
  scope: 'client',
  hasHint: true,
  onChange: (value) => {
    container.style.setProperty('--text-odd-color', value);
  },
  callOnChangeOnInit: true,
});

module.settings.register('rulerTextEvenColor', String, '', {
  scope: 'client',
  hasHint: true,
  onChange: (value) => {
    container.style.setProperty('--text-even-color', value);
  },
  callOnChangeOnInit: true,
});

module.settings.register('rulerTextOutlineThickness', Number, 1, {
  scope: 'client',
  hasHint: true,
  range: { min: 1, max: 20, step: 1 },
  onChange: (value) => {
    container.style.setProperty('--text-outline-thickness', `${value / 16}rem`);
  },
  callOnChangeOnInit: true,
});

module.settings.register('rulerTextOddOutline', String, '', {
  scope: 'client',
  hasHint: true,
  onChange: (value) => {
    container.style.setProperty('--text-odd-outline', value);
  },
  callOnChangeOnInit: true,
});

module.settings.register('rulerTextEvenOutline', String, '', {
  scope: 'client',
  hasHint: true,
  onChange: (value) => {
    container.style.setProperty('--text-even-outline', value);
  },
  callOnChangeOnInit: true,
});

const textOpacityRange = {
  min: 0,
  max: 100,
  step: 1,
};
module.settings.register('rulerTextOddOpacity', Number, 100, {
  range: textOpacityRange,
  scope: 'client',
  hasHint: true,
  onChange: (value) => {
    container.style.setProperty('--text-odd-opacity', `${value / 100}`);
  },
  callOnChangeOnInit: true,
});

module.settings.register('rulerTextEvenOpacity', Number, 100, {
  range: textOpacityRange,
  scope: 'client',
  hasHint: true,
  onChange: (value) => {
    container.style.setProperty('--text-even-opacity', `${value / 100}`);
  },
  callOnChangeOnInit: true,
});

module.settings.register('rulerOverlayEvenColor', String, '', {
  scope: 'client',
  hasHint: true,
  onChange: (value) => {
    container.style.setProperty('--overlay-even-color', value);
  },
  callOnChangeOnInit: true,
});

module.settings.register('rulerOverlayOddColor', String, '', {
  scope: 'client',
  hasHint: true,
  onChange: (value) => {
    container.style.setProperty('--overlay-odd-color', value);
  },
  callOnChangeOnInit: true,
});

const overlayOpacityRange = {
  min: 0,
  max: 25,
  step: 0.25,
};

module.settings.register('rulerOverlayEvenOpacity', Number, 2.5, {
  range: overlayOpacityRange,
  scope: 'client',
  hasHint: true,
  onChange: (value) => {
    container.style.setProperty('--overlay-even-opacity', `${value / 100}`);
  },
  callOnChangeOnInit: true,
});

module.settings.register('rulerOverlayOddOpacity', Number, 2.5, {
  range: overlayOpacityRange,
  scope: 'client',
  hasHint: true,
  onChange: (value) => {
    container.style.setProperty('--overlay-odd-opacity', `${value / 100}`);
  },
  callOnChangeOnInit: true,
});

export const addEdge = ({ wrapper }: { wrapper: HTMLDivElement }) => {
  container.appendChild(wrapper);
};

Hooks.once('ready', () => {
  document.body.appendChild(container);
});

export default container;
