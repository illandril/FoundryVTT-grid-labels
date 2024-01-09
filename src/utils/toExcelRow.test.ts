import toExcelRow from './toExcelRow';

it.each([
  // Positives
  ['1', 0],
  ['2', 1],
  ['3', 2],
  ['4', 3],
  ['5', 4],
  ['6', 5],
  ['7', 6],
  ['8', 7],
  ['9', 8],
  ['10', 9],
  ['11', 10],
  ['1000', 999],

  // Negatives
  ['(1)', -1],
  ['(2)', -2],
  ['(3)', -3],
  ['(4)', -4],
  ['(5)', -5],
  ['(6)', -6],
  ['(7)', -7],
  ['(8)', -8],
  ['(9)', -9],
  ['(10)', -10],
  ['(11)', -11],
  ['(999)', -999],
])('should return %j for %j', (expected, input) => {
  const actual = toExcelRow(input);
  expect(actual).toBe(expected);
});
