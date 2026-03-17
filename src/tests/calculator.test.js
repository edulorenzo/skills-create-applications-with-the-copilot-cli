const { calculate } = require('../calculator');

describe('Calculator basic operations', () => {
  test('2 + 3 => 5 (add)', () => {
    expect(calculate('add', 2, 3)).toBe(5);
  });

  test('2 + 3 => 5 (+ alias)', () => {
    expect(calculate('+', 2, 3)).toBe(5);
  });

  test('10 - 4 => 6 (sub)', () => {
    expect(calculate('sub', 10, 4)).toBe(6);
  });

  test('10 - 4 => 6 (- alias)', () => {
    expect(calculate('-', 10, 4)).toBe(6);
  });

  test('45 * 2 => 90 (mul)', () => {
    expect(calculate('mul', 45, 2)).toBe(90);
  });

  test('45 * 2 => 90 (* alias)', () => {
    expect(calculate('*', 45, 2)).toBe(90);
  });

  test('20 / 5 => 4 (div)', () => {
    expect(calculate('div', 20, 5)).toBe(4);
  });

  test('20 / 5 => 4 (/ alias)', () => {
    expect(calculate('/', 20, 5)).toBe(4);
  });
});

describe('Calculator edge cases and validation', () => {
  test('division by zero throws', () => {
    expect(() => calculate('div', 5, 0)).toThrow(/division/i);
  });

  test('non-numeric operand throws', () => {
    expect(() => calculate('add', 'a', 2)).toThrow(/valid numbers/i);
  });

  test('unknown operation throws', () => {
    expect(() => calculate('pow', 2, 3)).toThrow(/unknown/i);
  });

  test('requires exactly 3 args', () => {
    expect(() => calculate('add', 1)).toThrow(/3 arguments/i);
  });
});
