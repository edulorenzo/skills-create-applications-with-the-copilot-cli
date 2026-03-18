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

  // New operation tests based on calc-extended-operations.png
  test('5 % 2 => 1 (%)', () => {
    expect(calculate('%', 5, 2)).toBe(1);
  });

  test('10 % 3 => 1 (mod)', () => {
    expect(calculate('mod', 10, 3)).toBe(1);
  });

  test('2 ^ 3 => 8 (^ alias)', () => {
    expect(calculate('^', 2, 3)).toBe(8);
  });

  test('2 ** 8 => 256 (pow alias)', () => {
    expect(calculate('**', 2, 8)).toBe(256);
  });

  test('power with negative exponent 2 ^ -1 => 0.5', () => {
    expect(calculate('^', 2, -1)).toBeCloseTo(0.5);
  });

  test('power with non-integer exponent 9 ^ 0.5 => 3', () => {
    expect(calculate('pow', 9, 0.5)).toBeCloseTo(3);
  });

  test('sqrt 16 => 4 (sqrt unary)', () => {
    expect(calculate('sqrt', 16)).toBe(4);
  });
});

describe('Calculator edge cases and validation', () => {
  test('division by zero throws', () => {
    expect(() => calculate('div', 5, 0)).toThrow(/division/i);
  });

  test('modulo by zero throws', () => {
    expect(() => calculate('mod', 5, 0)).toThrow(/zero/i);
  });

  test('square root of negative number throws', () => {
    expect(() => calculate('sqrt', -16)).toThrow(/negative/i);
  });

  test('non-numeric operand throws', () => {
    expect(() => calculate('add', 'a', 2)).toThrow(/valid numbers/i);
  });

  test('unknown operation throws', () => {
    expect(() => calculate('unknownop', 2, 3)).toThrow(/unknown/i);
  });

  test('missing operand throws validation error', () => {
    expect(() => calculate('add', 1)).toThrow(/valid numbers/i);
  });
});
