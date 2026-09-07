const assert = require('node:assert/strict');
const test = require('node:test');

const { calculate } = require('../calculator');

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

test('rejects division by zero', () => {
  assert.throws(
    () => calculate(20, '/', 0),
    { message: 'Cannot divide by zero.' },
  );
});

test('rejects unsupported operators', () => {
  assert.throws(
    () => calculate(2, '%', 3),
    { message: 'Operator must be one of: +, -, *, /.' },
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
