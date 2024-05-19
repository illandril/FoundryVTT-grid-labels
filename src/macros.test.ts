import { ShowGrid } from './grid/container';
import { ShowRulers } from './rulers/container';

import './macros';

beforeAll(() => {
  Hooks.callAll('init');
});

beforeEach(() => {
  ShowGrid.set(false);
  ShowRulers.set(false);
});

it('exposes `window.illandril.gridLabels`', () => {
  expect(window.illandril?.gridLabels).toBeDefined();
});

it('gridLabels.show is an alias for gridLabels.grid.show', () => {
  expect(window.illandril?.gridLabels.show).toBe(window.illandril?.gridLabels.grid.show);
});

it('gridLabels.hide is an alias for gridLabels.grid.hide', () => {
  expect(window.illandril?.gridLabels.hide).toBe(window.illandril?.gridLabels.grid.hide);
});

it('gridLabels.toggle is an alias for gridLabels.grid.toggle', () => {
  expect(window.illandril?.gridLabels.toggle).toBe(window.illandril?.gridLabels.grid.toggle);
});

describe('gridLabels.grid', () => {
  it('changes the ShowGrid setting', () => {
    expect(ShowGrid.get()).toBe(false);
    expect(ShowRulers.get()).toBe(false);

    window.illandril?.gridLabels.grid.show();

    expect(ShowGrid.get()).toBe(true);
    expect(ShowRulers.get()).toBe(false);

    window.illandril?.gridLabels.grid.hide();

    expect(ShowGrid.get()).toBe(false);
    expect(ShowRulers.get()).toBe(false);

    window.illandril?.gridLabels.grid.hide();

    expect(ShowGrid.get()).toBe(false);
    expect(ShowRulers.get()).toBe(false);

    window.illandril?.gridLabels.grid.show();

    expect(ShowGrid.get()).toBe(true);
    expect(ShowRulers.get()).toBe(false);

    window.illandril?.gridLabels.grid.show();

    expect(ShowGrid.get()).toBe(true);
    expect(ShowRulers.get()).toBe(false);

    window.illandril?.gridLabels.grid.toggle();

    expect(ShowGrid.get()).toBe(false);
    expect(ShowRulers.get()).toBe(false);

    window.illandril?.gridLabels.grid.toggle();

    expect(ShowGrid.get()).toBe(true);
    expect(ShowRulers.get()).toBe(false);
  });
});

describe('gridLabels.rulers', () => {
  it('changes the ShowRulers setting', () => {
    expect(ShowRulers.get()).toBe(false);
    expect(ShowGrid.get()).toBe(false);

    window.illandril?.gridLabels.rulers.show();

    expect(ShowRulers.get()).toBe(true);
    expect(ShowGrid.get()).toBe(false);

    window.illandril?.gridLabels.rulers.hide();

    expect(ShowRulers.get()).toBe(false);
    expect(ShowGrid.get()).toBe(false);

    window.illandril?.gridLabels.rulers.hide();

    expect(ShowRulers.get()).toBe(false);
    expect(ShowGrid.get()).toBe(false);

    window.illandril?.gridLabels.rulers.show();

    expect(ShowRulers.get()).toBe(true);
    expect(ShowGrid.get()).toBe(false);

    window.illandril?.gridLabels.rulers.show();

    expect(ShowRulers.get()).toBe(true);
    expect(ShowGrid.get()).toBe(false);

    window.illandril?.gridLabels.rulers.toggle();

    expect(ShowRulers.get()).toBe(false);
    expect(ShowGrid.get()).toBe(false);

    window.illandril?.gridLabels.rulers.toggle();

    expect(ShowRulers.get()).toBe(true);
    expect(ShowGrid.get()).toBe(false);
  });
});

// window.illandril?.gridLabels.grid
