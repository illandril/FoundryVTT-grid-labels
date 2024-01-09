# Illandril's Grid Labels
![Latest Version](https://img.shields.io/badge/dynamic/json?color=4b0000&label=Latest%20Version&query=$.version&url=https%3A%2F%2Fgithub.com%2Fillandril%2FFoundryVTT-grid-labels%2Freleases%2Flatest%2Fdownload%2Fmodule.json)
![Latest Release Download Count](https://img.shields.io/github/downloads/illandril/FoundryVTT-grid-labels/latest/module.zip?color=4b0000&label=Downloads)
![Forge Installs](https://img.shields.io/badge/dynamic/json?color=4b0000&label=Forge%20Installs&query=package.installs&url=http%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fillandril-grid-labels&suffix=%25)
![Foundry Core Compatible Version](https://img.shields.io/badge/dynamic/json?color=4b0000&label=Foundry%20Version&query=$.compatibleCoreVersion&url=https%3A%2F%2Fgithub.com%2Fillandril%2FFoundryVTT-grid-labels%2Freleases%2Flatest%2Fdownload%2Fmodule.json)

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
