import { KEY as MODULE_KEY } from './module.js';
export const SETTINGS_UPDATED = MODULE_KEY + '.SettingsUpdated';

const refresh = () => {
  Hooks.callAll(SETTINGS_UPDATED);
};

const settingsList = [];

class Setting {
  constructor(type, key, defaultValue, options = {}) {
    this.type = type;
    this.key = key;
    this.hasHint = !!options.hasHint;
    this.defaultValue = defaultValue;
    this.choices = options.choices || undefined;
    this.scope = options.scope || 'world';
    settingsList.push(this);
  }

  register() {
    const name = game.i18n.localize(`${MODULE_KEY}.setting.${this.key}.label`);
    const hint = this.hasHint ? game.i18n.localize(`${MODULE_KEY}.setting.${this.key}.hint`) : null;
    game.settings.register(MODULE_KEY, this.key, {
      name,
      hint,
      scope: this.scope,
      config: true,
      default: this.defaultValue,
      type: this.type,
      choices: this.choices,
      onChange: refresh,
    });
  }

  get() {
    return game.settings.get(MODULE_KEY, this.key);
  }

  set(value) {
    return game.settings.set(MODULE_KEY, this.key, value);
  }
}

class BooleanSetting extends Setting {
  constructor(key, defaultValue, options = {}) {
    super(Boolean, key, defaultValue, options);
  }
}
const Settings = {
  ShowGridDefault: new BooleanSetting('showGridDefault', true, { hasHint: true } ),
  ShowGrid: new BooleanSetting('showGrid', true, { scope: 'user', hasHint: true } ),
};

Object.freeze(Settings);
export default Settings;

Hooks.once('init', () => {
  settingsList.forEach((setting) => {
    if(setting === Settings.ShowGrid) {
      Settings.ShowGrid.defaultValue = Settings.ShowGridDefault.get();
    }
    setting.register();
  });
});
