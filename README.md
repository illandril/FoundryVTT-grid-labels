# Illandril's Grid Labels

| [![Illandril](https://avatars.githubusercontent.com/illandril?size=64)](https://github.com/illandril) | [![Author](https://img.shields.io/badge/Joe%20Spandrusyszyn-Illandril?style=flat&labelColor=520&color=250&label=Illandril)](https://github.com/illandril) [![License](https://img.shields.io/github/license/illandril/FoundryVTT-grid-labels?style=flat&labelColor=520&color=250&label=license)](https://github.com/illandril/FoundryVTT-grid-labels/blob/main/LICENSE) <br> [![Version](https://img.shields.io/github/v/release/illandril/FoundryVTT-grid-labels?style=flat&labelColor=520&color=250&label=version)](https://github.com/illandril/FoundryVTT-grid-labels/releases) [![Open Issues](https://img.shields.io/github/issues/illandril/FoundryVTT-grid-labels?style=flat&labelColor=520&color=250&logo=github&label=issues)](https://github.com/illandril/FoundryVTT-grid-labels/issues) [![Latest Release Download Count](https://img.shields.io/github/downloads/illandril/FoundryVTT-grid-labels/latest/module.zip?style=flat&labelColor=520&color=250&label=downloads)](#) <br> [![Foundry Minimum Version](https://img.shields.io/badge/dynamic/json?style=flat&labelColor=520&color=250&label=Min.%20Foundry%20&prefix=v&query=$.compatibility.minimum&url=https%3A%2F%2Fgithub.com%2Fillandril%2FFoundryVTT-grid-labels%2Freleases%2Flatest%2Fdownload%2Fmodule.json)](https://foundryvtt.com/packages/illandril-grid-labels) [![Foundry Verified Version](https://img.shields.io/badge/dynamic/json?style=flat&labelColor=520&color=250&label=Verified%20on&prefix=v&query=$.compatibility.verified&url=https%3A%2F%2Fgithub.com%2Fillandril%2FFoundryVTT-grid-labels%2Freleases%2Flatest%2Fdownload%2Fmodule.json)](https://foundryvtt.com/packages/illandril-grid-labels) [![Forge Installs](https://img.shields.io/badge/dynamic/json?style=flat&labelColor=520&color=250&label=Forge%20Installs&query=package.installs&url=http%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fillandril-grid-labels&suffix=%25)](https://forge-vtt.com/bazaar/package/illandril-grid-labels) |
| --- | :--- |

This is a module for Foundry Virtual Tabletop that adds labels to the scene grid, to make it easier to refer to a specific location (e.g. "I shoot an arrow through the window" "Which window?" "The one at G24").

![Screenshot the module showing three possible configuration options](/screenshots/cover.png)

## Hotkeys
The Show Grid Labels and Show Grid Rulers settings can be toggled via hotkey (after you configure one in Configure Controls).

## Script Macros
The Show Grid Labels and Show Grid Rulers settings can also be modified via Script Macros.

To turn on Show Grid Labels for just you:
```
illandril.gridLabels.grid.show();
```

To turn off Show Grid Labels for just you:
```
illandril.gridLabels.grid.hide();
```

To toggle Show Grid Labels for just you:
```
illandril.gridLabels.grid.toggle();
```

To turn on Show Rulers for just you:
```
illandril.gridLabels.rulers.show();
```

To turn off Show Rulers for just you:
```
illandril.gridLabels.rulers.hide();
```

To toggle Show Rulers for just you:
```
illandril.gridLabels.rulers.toggle();
```

GMs can also sync their state to all other users that are currently logged in by passing `true` as the first argument to any of these functions (e.g. `illandril.gridLabels.grid.show(true);`).
