#!/usr/bin/env node

/**
 * A command-line calculator that supports only the four basic operations:
 * addition (+), subtraction (-), multiplication (*), and division (/).
 *
 * Usage:
 *   node src/calculator.js <number> <operator> <number>
 *
 * Examples:
 *   node src/calculator.js 12 + 8
 *   node src/calculator.js 12 / 4
 */

const OPERATIONS = {
  '+': (left, right) => left + right,
  '-': (left, right) => left - right,
  '*': (left, right) => left * right,
  '/': (left, right) => {
    if (right === 0) {
      throw new Error('Cannot divide by zero.');
    }

    return left / right;
  },
};

function calculate(leftInput, operator, rightInput) {
  const left = Number(leftInput);
  const right = Number(rightInput);

  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    throw new Error('Both operands must be valid numbers.');
  }

  const operation = OPERATIONS[operator];

  if (!operation) {
    throw new Error('Operator must be one of: +, -, *, /.');
  }

  return operation(left, right);
}

function main() {
  const [, , left, operator, right] = process.argv;

  if (left === undefined || operator === undefined || right === undefined) {
    console.error('Usage: node src/calculator.js <number> <operator> <number>');
    process.exitCode = 1;
    return;
  }

  try {
    console.log(calculate(left, operator, right));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = { calculate };
