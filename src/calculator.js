#!/usr/bin/env node

/**
 * CLI Calculator
 *
 * Supported operations:
 *  - add or + : addition
 *  - sub or - : subtraction
 *  - mul or * : multiplication
 *  - div or / : division
 *  - mod or % : modulo (remainder)
 *  - pow or ** or ^ : exponentiation (power)
 *  - sqrt : square root (unary)
 *
 * Exposes programmatic functions for testing and a CLI interface when run.
 */

function printUsage() {
  console.error('Usage: node src/calculator.js <operation> <num1> [num2]');
  console.error('Operations: add | +, sub | -, mul | *, div | /, mod | %, pow | ** | ^, sqrt');
}

function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

// New functions requested:
function modulo(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) throw new Error('Both operands must be valid numbers');
  if (b === 0) throw new Error('Modulo by zero');
  return a % b;
}

function power(base, exponent) {
  if (!Number.isFinite(base) || !Number.isFinite(exponent)) throw new Error('Both operands must be valid numbers');
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (!Number.isFinite(n)) throw new Error('Operand must be a valid number');
  if (n < 0) throw new Error('Cannot take square root of negative number');
  return Math.sqrt(n);
}

/**
 * Calculate the result of an operation.
 * Supports both binary and unary (sqrt) operations.
 */
function calculate(opRaw, aRaw, bRaw) {
  const op = String(opRaw).toLowerCase();

  // Unary: sqrt
  if (op === 'sqrt') {
    const a = toNumber(aRaw);
    if (a === null) throw new Error('Operand must be a valid number');
    return squareRoot(a);
  }

  // Binary operations require two operands
  const a = toNumber(aRaw);
  const b = toNumber(bRaw);
  if (a === null || b === null) throw new Error('Both operands must be valid numbers');

  switch (op) {
    case 'add':
    case '+':
      return a + b;
    case 'sub':
    case '-':
      return a - b;
    case 'mul':
    case '*':
      return a * b;
    case 'div':
    case '/':
      if (b === 0) throw new Error('Division by zero');
      return a / b;
    case 'mod':
    case '%':
      return modulo(a, b);
    case 'pow':
    case '**':
    case '^':
      return power(a, b);
    default:
      throw new Error(`Unknown operation: ${opRaw}`);
  }
}

// CLI entrypoint when executed directly
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 2 || args.length > 3) {
    printUsage();
    process.exit(1);
  }

  const [opRaw, aRaw, bRaw] = args;
  try {
    const result = calculate(opRaw, aRaw, bRaw);
    console.log(result);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    printUsage();
    process.exit(1);
  }
}

module.exports = { toNumber, calculate, modulo, power, squareRoot };
