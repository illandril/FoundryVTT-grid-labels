import { ShowGrid } from './grid/container';
import { ShowRulers } from './rulers/container';

import './macros';
import { SocketType } from './sync';

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

  it('does not sync when calling grid.show()', () => {
    window.illandril?.gridLabels.grid.show();
    expect(jest.mocked(game.socket?.emit)).not.toHaveBeenCalled();
  });

  it('does not sync when calling grid.hide()', () => {
    window.illandril?.gridLabels.grid.hide();
    expect(jest.mocked(game.socket?.emit)).not.toHaveBeenCalled();
  });

  it('does not sync when calling grid.toggle()', () => {
    window.illandril?.gridLabels.grid.toggle();
    expect(jest.mocked(game.socket?.emit)).not.toHaveBeenCalled();
  });

  it('does not sync when calling grid.show(false)', () => {
    window.illandril?.gridLabels.grid.show(false);
    expect(jest.mocked(game.socket?.emit)).not.toHaveBeenCalled();
  });

  it('does not sync when calling grid.hide(false)', () => {
    window.illandril?.gridLabels.grid.hide(false);
    expect(jest.mocked(game.socket?.emit)).not.toHaveBeenCalled();
  });

  it('does not sync when calling grid.toggle(false)', () => {
    window.illandril?.gridLabels.grid.toggle(false);
    expect(jest.mocked(game.socket?.emit)).not.toHaveBeenCalled();
  });

  it('does not sync when calling grid.show(true) for non-GMs', () => {
    jest.replaceProperty(game.user!, 'isGM', false);

    window.illandril?.gridLabels.grid.show(true);
    expect(jest.mocked(game.socket?.emit)).not.toHaveBeenCalled();
  });

  it('does not sync when calling grid.hide(true) for non-GMs', () => {
    jest.replaceProperty(game.user!, 'isGM', false);

    window.illandril?.gridLabels.grid.hide(true);
    expect(jest.mocked(game.socket?.emit)).not.toHaveBeenCalled();
  });

  it('does not sync when calling grid.toggle(true) for non-GMs', () => {
    jest.replaceProperty(game.user!, 'isGM', false);

    window.illandril?.gridLabels.grid.toggle(true);
    expect(jest.mocked(game.socket?.emit)).not.toHaveBeenCalled();
  });

  it('syncs when calling grid.show(true) for GMs', () => {
    jest.replaceProperty(game.user!, 'isGM', true);

    window.illandril?.gridLabels.grid.show(true);
    expect(jest.mocked(game.socket?.emit)).toHaveBeenCalledTimes(1);
    expect(jest.mocked(game.socket?.emit)).toHaveBeenCalledWith('module.illandril-grid-labels', {
      id: expect.stringMatching(/^mock-random-id-\d+$/),
      payload: { value: true },
      type: SocketType.ShowGrid,
    });
  });

  it('syncs when calling grid.hide(true) for GMs', () => {
    jest.replaceProperty(game.user!, 'isGM', true);

    window.illandril?.gridLabels.grid.hide(true);
    expect(jest.mocked(game.socket?.emit)).toHaveBeenCalledTimes(1);
    expect(jest.mocked(game.socket?.emit)).toHaveBeenCalledWith('module.illandril-grid-labels', {
      id: expect.stringMatching(/^mock-random-id-\d+$/),
      payload: { value: false },
      type: SocketType.ShowGrid,
    });
  });

  it('syncs when calling grid.toggle(true) for GMs', () => {
    jest.replaceProperty(game.user!, 'isGM', true);

    window.illandril?.gridLabels.grid.toggle(true);
    expect(jest.mocked(game.socket?.emit)).toHaveBeenCalledTimes(1);
    expect(jest.mocked(game.socket?.emit)).toHaveBeenCalledWith('module.illandril-grid-labels', {
      id: expect.stringMatching(/^mock-random-id-\d+$/),
      payload: { value: true },
      type: SocketType.ShowGrid,
    });

    window.illandril?.gridLabels.grid.toggle(true);
    expect(jest.mocked(game.socket?.emit)).toHaveBeenCalledTimes(2);
    expect(jest.mocked(game.socket?.emit)).toHaveBeenLastCalledWith('module.illandril-grid-labels', {
      id: expect.stringMatching(/^mock-random-id-\d+$/),
      payload: { value: false },
      type: SocketType.ShowGrid,
    });
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

  it('does not sync when calling rulers.show()', () => {
    window.illandril?.gridLabels.rulers.show();
    expect(jest.mocked(game.socket?.emit)).not.toHaveBeenCalled();
  });

  it('does not sync when calling rulers.hide()', () => {
    window.illandril?.gridLabels.rulers.hide();
    expect(jest.mocked(game.socket?.emit)).not.toHaveBeenCalled();
  });

  it('does not sync when calling rulers.toggle()', () => {
    window.illandril?.gridLabels.rulers.toggle();
    expect(jest.mocked(game.socket?.emit)).not.toHaveBeenCalled();
  });

  it('does not sync when calling rulers.show(false)', () => {
    window.illandril?.gridLabels.rulers.show(false);
    expect(jest.mocked(game.socket?.emit)).not.toHaveBeenCalled();
  });

  it('does not sync when calling rulers.hide(false)', () => {
    window.illandril?.gridLabels.rulers.hide(false);
    expect(jest.mocked(game.socket?.emit)).not.toHaveBeenCalled();
  });

  it('does not sync when calling rulers.toggle(false)', () => {
    window.illandril?.gridLabels.rulers.toggle(false);
    expect(jest.mocked(game.socket?.emit)).not.toHaveBeenCalled();
  });

  it('does not sync when calling rulers.show(true) for non-GMs', () => {
    jest.replaceProperty(game.user!, 'isGM', false);

    window.illandril?.gridLabels.rulers.show(true);
    expect(jest.mocked(game.socket?.emit)).not.toHaveBeenCalled();
  });

  it('does not sync when calling rulers.hide(true) for non-GMs', () => {
    jest.replaceProperty(game.user!, 'isGM', false);

    window.illandril?.gridLabels.rulers.hide(true);
    expect(jest.mocked(game.socket?.emit)).not.toHaveBeenCalled();
  });

  it('does not sync when calling rulers.toggle(true) for non-GMs', () => {
    jest.replaceProperty(game.user!, 'isGM', false);

    window.illandril?.gridLabels.rulers.toggle(true);
    expect(jest.mocked(game.socket?.emit)).not.toHaveBeenCalled();
  });

  it('syncs when calling rulers.show(true) for GMs', () => {
    jest.replaceProperty(game.user!, 'isGM', true);

    window.illandril?.gridLabels.rulers.show(true);
    expect(jest.mocked(game.socket?.emit)).toHaveBeenCalledTimes(1);
    expect(jest.mocked(game.socket?.emit)).toHaveBeenCalledWith('module.illandril-grid-labels', {
      id: expect.stringMatching(/^mock-random-id-\d+$/),
      payload: { value: true },
      type: SocketType.ShowRulers,
    });
  });

  it('syncs when calling rulers.hide(true) for GMs', () => {
    jest.replaceProperty(game.user!, 'isGM', true);

    window.illandril?.gridLabels.rulers.hide(true);
    expect(jest.mocked(game.socket?.emit)).toHaveBeenCalledTimes(1);
    expect(jest.mocked(game.socket?.emit)).toHaveBeenCalledWith('module.illandril-grid-labels', {
      id: expect.stringMatching(/^mock-random-id-\d+$/),
      payload: { value: false },
      type: SocketType.ShowRulers,
    });
  });

  it('syncs when calling rulers.toggle(true) for GMs', () => {
    jest.replaceProperty(game.user!, 'isGM', true);

    window.illandril?.gridLabels.rulers.toggle(true);
    expect(jest.mocked(game.socket?.emit)).toHaveBeenCalledTimes(1);
    expect(jest.mocked(game.socket?.emit)).toHaveBeenCalledWith('module.illandril-grid-labels', {
      id: expect.stringMatching(/^mock-random-id-\d+$/),
      payload: { value: true },
      type: SocketType.ShowRulers,
    });

    window.illandril?.gridLabels.rulers.toggle(true);
    expect(jest.mocked(game.socket?.emit)).toHaveBeenCalledTimes(2);
    expect(jest.mocked(game.socket?.emit)).toHaveBeenLastCalledWith('module.illandril-grid-labels', {
      id: expect.stringMatching(/^mock-random-id-\d+$/),
      payload: { value: false },
      type: SocketType.ShowRulers,
    });
  });
});

// window.illandril?.gridLabels.grid
