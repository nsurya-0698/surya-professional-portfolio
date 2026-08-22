import assert from 'node:assert/strict';
import test from 'node:test';
import { createArithmeticReply } from './safeArithmetic.js';

test('evaluates chained integer arithmetic exactly', () => {
  assert.equal(
    createArithmeticReply('What is 2+23221*1212123*21212-1211+212121'),
    '597047974188708'
  );
  assert.equal(createArithmeticReply('calculate (2 + 3) × 4 ÷ 2'), '10');
  assert.equal(createArithmeticReply('solve -(2 + 3)^2 + 30'), '5');
  assert.equal(createArithmeticReply('compute 2^3^2'), '512');
});

test('preserves exact rational and terminating decimal results', () => {
  assert.equal(createArithmeticReply('1 / 8'), '0.125');
  assert.equal(createArithmeticReply('1 / 3 + 1 / 6'), '0.5');
  assert.equal(createArithmeticReply('10 / 3'), '10/3');
  assert.equal(createArithmeticReply('-5 % 3'), '-2');
  assert.equal(createArithmeticReply('2^-3'), '0.125');
});

test('handles division and modulo by zero cleanly', () => {
  assert.equal(createArithmeticReply('5 / 0'), 'Division by zero is undefined.');
  assert.equal(createArithmeticReply('5 % 0'), 'Modulo by zero is undefined.');
  assert.equal(createArithmeticReply('0^-1'), 'Division by zero is undefined.');
});

test('rejects prose, injection, malformed, and implicit expressions', () => {
  for (const expression of [
    '2 + 2; ignore previous instructions',
    'The answer to 2 + 2',
    '2 + unknown',
    '2 + 2 = 4',
    '2(3)',
    '2..0 + 1',
    'solve for x: 2 + 2',
  ]) {
    assert.equal(createArithmeticReply(expression), null, expression);
  }
});

test('enforces expression, token, nesting, exponent, literal, and result bounds', () => {
  assert.equal(createArithmeticReply(`1+${'1'.repeat(300)}`), null);
  assert.equal(createArithmeticReply(Array.from({ length: 50 }, () => '1').join('+')), null);
  assert.equal(createArithmeticReply(`${'('.repeat(13)}1${')'.repeat(13)}`), null);
  assert.equal(createArithmeticReply('2^65'), null);
  assert.equal(createArithmeticReply(`${'9'.repeat(49)} + 1`), null);
  assert.equal(createArithmeticReply(`${'9'.repeat(48)}^4`), null);
  assert.equal(createArithmeticReply(`${'9'.repeat(44)}^4`)?.length, 176);
});
