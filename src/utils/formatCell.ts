import module from '../module';

import type { GridDetails } from './getCurrentGridDetails';
import toExcelColumn from './toExcelColumn';
import toExcelRow from './toExcelRow';
import zeroPad from './zeroPad';

declare global {
  interface HookCallbacks {
    'illandril-grid-labels.formatChange': () => void;
  }
}

export const onFormatChage = (callback: () => void) => {
  Hooks.on(`${module.id}.formatChange`, callback);
};

const onChange = () => {
  Hooks.callAll(`${module.id}.formatChange`);
};
Hooks.on('updateScene', () => {
  onChange();
});

enum Separator {
  // biome-ignore lint/style/useNamingConvention: Legacy
  none = '',
  // biome-ignore lint/style/useNamingConvention: Legacy
  space = ' ',
  // biome-ignore lint/style/useNamingConvention: Legacy
  comma = ',',
  // biome-ignore lint/style/useNamingConvention: Legacy
  commaSpace = ', ',
  // biome-ignore lint/style/useNamingConvention: Legacy
  period = '.',
  // biome-ignore lint/style/useNamingConvention: Legacy
  periodSpace = '. ',
  // biome-ignore lint/style/useNamingConvention: Legacy
  slash = '/',
  // biome-ignore lint/style/useNamingConvention: Legacy
  spaceSlashSpace = ' / ',
  // biome-ignore lint/style/useNamingConvention: Legacy
  pipe = '|',
  // biome-ignore lint/style/useNamingConvention: Legacy
  spacePipeSpace = ' | ',
  // biome-ignore lint/style/useNamingConvention: Legacy
  newline = '\n',
}

const separatorChoices = Object.keys(Separator) as (keyof typeof Separator)[];
const separatorChoiceMap = Object.fromEntries(
  separatorChoices.map(
    (choice) => [choice, () => module.localize(`setting.format.separatorChoice.${choice}`)] as const,
  ),
) as Record<keyof typeof Separator, () => string>;

const choices = ['letter', 'number', 'zero2', 'zero3', 'zero4'] as const;
const choicesMap = Object.fromEntries(
  choices.map((choice) => [choice, () => module.localize(`setting.format.formatChoice.${choice}`)] as const),
) as Record<(typeof choices)[number], () => string>;

class Format {
  private readonly column;
  private readonly row;
  private readonly separator;
  private readonly columnFirst;
  constructor(type: string) {
    this.columnFirst = module.settings.register(`format.${type}.columnFirst`, Boolean, true, {
      scope: 'world',
      hasHint: true,
      onChange,
    });
    this.column = module.settings.register<(typeof choices)[number]>(`format.${type}.column`, String, 'letter', {
      scope: 'world',
      hasHint: true,
      onChange,
      choices: choicesMap,
    });
    this.row = module.settings.register<(typeof choices)[number]>(`format.${type}.row`, String, 'number', {
      scope: 'world',
      hasHint: true,
      onChange,
      choices: choicesMap,
    });
    this.separator = module.settings.register<(typeof separatorChoices)[number]>(
      `format.${type}.separator`,
      String,
      'none',
      {
        scope: 'world',
        hasHint: true,
        onChange,
        choices: separatorChoiceMap,
      },
    );
  }

  formatColumn(index: number) {
    return formatRowOrCol(index, this.column.get());
  }

  formatRow(index: number) {
    return formatRowOrCol(index, this.row.get());
  }

  _formatCell(columnIndex: number, rowIndex: number) {
    const col = this.formatColumn(columnIndex);
    const row = this.formatRow(rowIndex);
    let a: string;
    let b: string;
    if (this.columnFirst.get()) {
      a = col;
      b = row;
    } else {
      a = row;
      b = col;
    }
    return `${a}${Separator[this.separator.get()] ?? ''}${b}`;
  }
}

const square = new Format('square');
const hex = new Format('hex');

const hexVariantChoices = ['offset', 'doubled', 'axial'] as const;
type HexVariant = (typeof hexVariantChoices)[number];

const HexVariant = module.settings.register<HexVariant>('format.hex.variant', String, 'offset', {
  scope: 'world',
  hasHint: true,
  onChange,
  choices: hexVariantChoices,
});

const formatRowOrCol = (index: number, style: (typeof choices)[number]) => {
  if (style === 'letter') {
    return toExcelColumn(index);
  }
  if (style.startsWith('zero')) {
    return zeroPad(index, Number.parseInt(style.substring(4), 10));
  }
  return toExcelRow(index);
};

export const getFormatter = (grid: BaseGrid) => {
  if (grid instanceof HexagonalGrid) {
    return hex;
  }
  return square;
};

const doubledIndexes = (grid: HexagonalGrid, columnIndex: number, rowIndex: number) => {
  const [a, b] = grid.columnar ? [rowIndex, columnIndex] : [columnIndex, rowIndex];
  let offset = b % 2;
  if (grid.even) {
    offset = 1 - offset;
  }
  const offsetA = a * 2 + offset;
  return grid.columnar ? [b, offsetA] : [offsetA, b];
};

export const getRulerModifiers = ({ grid, scene }: GridDetails<SquareGrid>) => {
  const modifiers = {
    column: {
      multiplier: 1,
      offset: getOffset(scene, 'col'),
    },
    row: {
      multiplier: 1,
      offset: getOffset(scene, 'row'),
    },
  };
  if (grid instanceof HexagonalGrid) {
    const variant = HexVariant.get();
    if (variant === 'doubled') {
      if (grid.columnar) {
        modifiers.row.multiplier = 2;
      } else {
        modifiers.column.multiplier = 2;
      }
    } else if (variant === 'axial') {
      modifiers.column.multiplier = 0;
      modifiers.row.multiplier = 0;
    }
  }
  return modifiers;
};

const getOffset = (scene: Scene, type: 'col' | 'row') => {
  const offset = scene.getFlag(module.id, `${type}Offset`);
  if (typeof offset === 'number') {
    return offset;
  }
  if (typeof offset === 'string') {
    return Number.parseInt(offset, 10) || 0;
  }
  return 0;
};

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Legacy
const formatCell = ({ grid, scene }: GridDetails<SquareGrid>, rawColumnIndex: number, rawRowIndex: number) => {
  let columnIndex = rawColumnIndex;
  let rowIndex = rawRowIndex;
  let formatter: Format;
  if (grid instanceof HexagonalGrid) {
    formatter = hex;
    const variant = HexVariant.get();
    if (variant === 'doubled') {
      [columnIndex, rowIndex] = doubledIndexes(grid, columnIndex, rowIndex);
      columnIndex += getOffset(scene, 'col');
      rowIndex += getOffset(scene, 'row');
    } else if (variant === 'axial') {
      columnIndex += getOffset(scene, 'col');
      rowIndex += getOffset(scene, 'row');
      if (grid.columnar) {
        rowIndex = rowIndex - (columnIndex + (((grid.even ? 1 : -1) * Math.abs(columnIndex)) % 2)) / 2;
      } else {
        columnIndex = columnIndex - (rowIndex + (((grid.even ? -1 : 1) * Math.abs(rowIndex)) % 2)) / 2;
      }
    } else {
      columnIndex += getOffset(scene, 'col');
      rowIndex += getOffset(scene, 'row');
    }
  } else {
    columnIndex += getOffset(scene, 'col');
    rowIndex += getOffset(scene, 'row');
    formatter = square;
  }
  return formatter._formatCell(columnIndex, rowIndex);
};

export default formatCell;
