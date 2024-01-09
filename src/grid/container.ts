import module from '../module';

const cssGrid = module.cssPrefix.childPrefix('grid');

const container = document.createElement('div');
container.classList.add(cssGrid.child('container'));

let visible: boolean = false;

export const hide = () => {
  visible = false;
  resetAriaHidden();
};

export const show = () => {
  visible = true;
  resetAriaHidden();
};

const resetAriaHidden = () => {
  container.ariaHidden = visible && ShowGrid.get() ? 'false' : 'true';
};

let scale = 1;

export const setScale = (x: number, y: number) => {
  scale = Math.max(x, y);
  resetScale();
};

const resetScale = () => {
  const shouldScale = ScaleFontSize.get();
  container.style.setProperty('--scale', shouldScale ? `${scale * 100}%` : '100%');
};

export const ShowGrid = module.settings.register('showGrid', Boolean, false, {
  scope: 'client',
  hasHint: true,
  callOnChangeOnInit: true,
  onChange: resetAriaHidden,
});

module.settings.register('gridFontSize', Number, 1, {
  scope: 'client',
  hasHint: true,
  range: { min: 0.5, max: 5, step: 0.1 },
  onChange: (value) => {
    container.style.setProperty('--font-size', `${value}rem`);
  },
  callOnChangeOnInit: true,
});

const ScaleFontSize = module.settings.register('gridScaleFontSize', Boolean, false, {
  scope: 'client',
  hasHint: true,
  onChange: resetScale,
  callOnChangeOnInit: true,
});

module.settings.register('gridTextColor', String, '', {
  scope: 'client',
  hasHint: true,
  onChange: (value) => {
    container.style.setProperty('--text-color', value);
  },
  callOnChangeOnInit: true,
});

module.settings.register('gridTextOutlineThickness', Number, 1, {
  scope: 'client',
  hasHint: true,
  range: { min: 1, max: 20, step: 1 },
  onChange: (value) => {
    container.style.setProperty('--text-outline-thickness', `${value / 16}rem`);
  },
  callOnChangeOnInit: true,
});

module.settings.register('gridTextOutline', String, '', {
  scope: 'client',
  hasHint: true,
  onChange: (value) => {
    container.style.setProperty('--text-outline', value);
  },
  callOnChangeOnInit: true,
});

module.settings.register('gridTextOpacity', Number, 85, {
  range: {
    min: 0,
    max: 100,
    step: 1,
  },
  scope: 'client',
  hasHint: true,
  onChange: (value) => {
    container.style.setProperty('--text-opacity', `${value / 100}`);
  },
  callOnChangeOnInit: true,
});

module.settings.register('gridTextVAlignment', String, 'center', {
  choices: ['top', 'center', 'bottom'],
  scope: 'client',
  hasHint: true,
  onChange: (value) => {
    container.setAttribute('data-v', value);
  },
  callOnChangeOnInit: true,
});

module.settings.register('gridTextHAlignment', String, 'center', {
  choices: ['left', 'center', 'right'],
  scope: 'client',
  hasHint: true,
  onChange: (value) => {
    container.setAttribute('data-h', value);
  },
  callOnChangeOnInit: true,
});

Hooks.once('ready', () => {
  document.body.appendChild(container);
});

export default container;
