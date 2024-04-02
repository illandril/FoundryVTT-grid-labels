import module from '../module';

import toExcelColumn from './toExcelColumn';
import toExcelRow from './toExcelRow';
import zeroPad from './zeroPad';

declare global {
  interface HookCallbacks {
    'illandril-grid-labels.formatChange': () => void
  }
}

export const onFormatChage = (callback: () => void) => {
  Hooks.on(`${module.id}.formatChange`, callback);
};

const onChange = () => {
  Hooks.callAll(`${module.id}.formatChange`);
};

enum Separator {
  none = '',
  space = ' ',
  comma = ',',
  commaSpace = ', ',
  period = '.',
  periodSpace = '. ',
  slash = '/',
  spaceSlashSpace = ' / ',
  pipe = '|',
  spacePipeSpace = ' | ',
  newline = '\n',
}

const separatorChoices = Object.keys(Separator) as (keyof typeof Separator)[];
const separatorChoiceMap = Object.fromEntries(
  separatorChoices.map((choice) => [choice, () => module.localize(`setting.format.separatorChoice.${choice}`)] as const),
) as Record<keyof typeof Separator, () => string>;

const choices = [
  'letter',
  'number',
  'zero2',
  'zero3',
  'zero4',
] as const;
const choicesMap = Object.fromEntries(
  choices.map((choice) => [choice, () => module.localize(`setting.format.formatChoice.${choice}`)] as const),
) as Record<typeof choices[number], () => string>;

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
    this.column = module.settings.register<typeof choices[number]>(`format.${type}.column`, String, 'letter', {
      scope: 'world',
      hasHint: true,
      onChange,
      choices: choicesMap,
    });
    this.row = module.settings.register<typeof choices[number]>(`format.${type}.row`, String, 'number', {
      scope: 'world',
      hasHint: true,
      onChange,
      choices: choicesMap,
    });
    this.separator = module.settings.register<typeof separatorChoices[number]>(`format.${type}.separator`, String, 'none', {
      scope: 'world',
      hasHint: true,
      onChange,
      choices: separatorChoiceMap,
    });
  }

  formatColumn(index: number) {
    return formatRowOrCol(index, this.column.get());
  }

  formatRow(index: number) {
    return formatRowOrCol(index, this.row.get());
  }

  formatCell(columnIndex: number, rowIndex: number) {
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

const formatRowOrCol = (index: number, style: typeof choices[number]) => {
  if (style === 'letter') {
    return toExcelColumn(index);
  }
  if (style.startsWith('zero')) {
    return zeroPad(index, parseInt(style.substring(4), 10));
  }
  return toExcelRow(index);
};

export const getFormatter = (grid: BaseGrid) => {
  if (grid instanceof SquareGrid) {
    return square;
  }
  if (grid instanceof HexagonalGrid) {
    return hex;
  }
  module.logger.error('Unexpected grid type - falling back to square grid formatting', grid);
  return square;
};
