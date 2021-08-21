# Illandril's Grid Labels
![Latest Release Download Count](https://img.shields.io/github/downloads/illandril/FoundryVTT-grid-labels/latest/module.zip?color=4b0000&label=Downloads)
![Forge Installs](https://img.shields.io/badge/dynamic/json?color=4b0000&label=Forge%20Installs&query=package.installs&url=http%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fillandril-grid-labels&suffix=%25)
![Foundry Core Compatible Version](https://img.shields.io/badge/dynamic/json?color=4b0000&label=Foundry%20Version&query=$.compatibleCoreVersion&url=https%3A%2F%2Fgithub.com%2Fillandril%2FFoundryVTT-grid-labels%2Freleases%2Flatest%2Fdownload%2Fmodule.json)

This is a module for Foundry Virtual Tabletop that adds labels to the scene grid.

This module is a WIP, and I may or may not ever complete it. If you are a module developer and would like to use my work as the basis for a more complete module providing this functionality, feel free to do so (just follow the license, and give your module it's own name so it doesn't conflict with mine in case I finish it). If you finish and release a module with this functionality, let me know and I will link to it here.

The grid labels can be toggled through Script Macros.
`illandril.gridLabels.show();` turns the labels on for you. `illandril.gridLabels.hide();` turns the labels off for you. `illandril.gridLabels.toggles();` toggles the label visibility for you (turns it on if they were off, and off if they were on).

GMs can also update the grid label visibility for everyone that is currently logged in. `illandril.gridLabels.show(true);` will turn the labels on for everyone. `illandril.gridLabels.hide(true);` will turn the labels off for everyone. `illandril.gridLabels.toggles(true);` will toggle the labels for you, then update everyone else to match your new visibility.
