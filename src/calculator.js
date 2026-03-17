#!/usr/bin/env node

/**
 * CLI Calculator
 *
 * Supported operations:
 *  - add or + : addition
 *  - sub or - : subtraction
 *  - mul or * : multiplication
 *  - div or / : division
 *
 * Exposes a programmatic `calculate(op, a, b)` function for testing and a
 * CLI interface when executed directly.
 */

function printUsage() {
  console.error('Usage: node src/calculator.js <operation> <num1> <num2>');
  console.error('Operations: add | +, sub | -, mul | *, div | /');
}

function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

/**
 * Calculate the result of an operation.
 * Throws Error on invalid input (non-numeric, unknown op, division by zero).
 */
function calculate(opRaw, aRaw, bRaw) {
  if (arguments.length !== 3) {
    throw new Error('Expected exactly 3 arguments: operation, a, b');
  }

  const op = String(opRaw).toLowerCase();
  const a = toNumber(aRaw);
  const b = toNumber(bRaw);

  if (a === null || b === null) {
    throw new Error('Both operands must be valid numbers');
  }

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
    default:
      throw new Error(`Unknown operation: ${opRaw}`);
  }
}

// CLI entrypoint when executed directly
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length !== 3) {
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

module.exports = { toNumber, calculate };
