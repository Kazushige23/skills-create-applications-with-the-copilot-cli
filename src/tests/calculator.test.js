const assert = require('node:assert/strict');
const test = require('node:test');

const { calculate, modulo, power, squareRoot } = require('../calculator');

test('performs addition', () => {
  assert.equal(calculate(2, '+', 3), 5);
});

test('performs subtraction', () => {
  assert.equal(calculate(10, '-', 4), 6);
});

test('performs multiplication', () => {
  assert.equal(calculate(45, '*', 2), 90);
});

test('performs division', () => {
  assert.equal(calculate(20, '/', 5), 4);
});

test('accepts numeric strings from CLI-style input', () => {
  assert.equal(calculate('12.5', '+', '7.5'), 20);
});

test('handles negative operands', () => {
  assert.equal(calculate(-8, '+', 3), -5);
  assert.equal(calculate(-6, '*', -2), 12);
});

test('handles decimal division', () => {
  assert.equal(calculate(1, '/', 4), 0.25);
});

test('performs modulo', () => {
  assert.equal(modulo(5, 2), 1);
  assert.equal(calculate(5, '%', 2), 1);
  assert.equal(modulo(-5, 2), -1);
});

test('rejects modulo by zero', () => {
  assert.throws(
    () => modulo(10, 0),
    { message: 'Cannot calculate modulo by zero.' },
  );
});

test('performs exponentiation', () => {
  assert.equal(power(2, 3), 8);
  assert.equal(calculate(2, '^', 3), 8);
  assert.equal(power(5, 0), 1);
  assert.equal(power(2, -2), 0.25);
});

test('calculates square roots', () => {
  assert.equal(squareRoot(16), 4);
  assert.equal(calculate(16, '^', 0.5), 4);
  assert.equal(squareRoot(0), 0);
});

test('rejects square roots of negative numbers', () => {
  assert.throws(
    () => squareRoot(-1),
    { message: 'Cannot calculate the square root of a negative number.' },
  );
});

test('rejects division by zero', () => {
  assert.throws(
    () => calculate(20, '/', 0),
    { message: 'Cannot divide by zero.' },
  );
});

test('rejects unsupported operators', () => {
  assert.throws(
    () => calculate(2, '&', 3),
    { message: 'Operator must be one of: +, -, *, /, %, ^.' },
  );
});

test('rejects non-numeric operands', () => {
  assert.throws(
    () => calculate('not-a-number', '+', 3),
    { message: 'Both operands must be valid numbers.' },
  );
});

test('rejects non-finite operands', () => {
  assert.throws(
    () => calculate(Infinity, '+', 3),
    { message: 'Both operands must be valid numbers.' },
  );
});
