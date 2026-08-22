const MAX_EXPRESSION_LENGTH = 256;
const MAX_TOKENS = 96;
const MAX_OPERATIONS = 48;
const MAX_NESTING_DEPTH = 12;
const MAX_LITERAL_DIGITS = 48;
const MAX_RESULT_DIGITS = 180;
const MAX_EXPONENT = 64n;

const PREFIX_PATTERN = /^(?:what\s+is|what's|calculate|compute|solve)\b\s*:?[ \t]*/i;
const OPERATOR_CHARACTERS = new Set(['+', '-', '*', '/', '%', '^', '(', ')']);

class ArithmeticError extends Error {
  constructor(code) {
    super(code);
    this.code = code;
  }
}

const digitCount = (value) => {
  const absolute = value < 0n ? -value : value;
  return absolute.toString().length;
};

const gcd = (left, right) => {
  let a = left < 0n ? -left : left;
  let b = right < 0n ? -right : right;

  while (b !== 0n) {
    const remainder = a % b;
    a = b;
    b = remainder;
  }

  return a;
};

const normalize = (numerator, denominator = 1n) => {
  if (denominator === 0n) throw new ArithmeticError('division-zero');

  let nextNumerator = numerator;
  let nextDenominator = denominator;
  if (nextDenominator < 0n) {
    nextNumerator = -nextNumerator;
    nextDenominator = -nextDenominator;
  }

  if (nextNumerator === 0n) {
    return { numerator: 0n, denominator: 1n };
  }

  const divisor = gcd(nextNumerator, nextDenominator);
  const value = {
    numerator: nextNumerator / divisor,
    denominator: nextDenominator / divisor,
  };

  if (
    digitCount(value.numerator) > MAX_RESULT_DIGITS ||
    digitCount(value.denominator) > MAX_RESULT_DIGITS
  ) {
    throw new ArithmeticError('result-too-large');
  }

  return value;
};

const parseLiteral = (literal) => {
  const digits = literal.replace('.', '').replace(/^0+/, '') || '0';
  if (digits.length > MAX_LITERAL_DIGITS) throw new ArithmeticError('literal-too-large');

  if (!literal.includes('.')) {
    return normalize(BigInt(literal));
  }

  const [whole = '0', fraction = ''] = literal.split('.');
  const numerator = BigInt(`${whole || '0'}${fraction}` || '0');
  const denominator = 10n ** BigInt(fraction.length);
  return normalize(numerator, denominator);
};

const add = (left, right) => {
  const denominatorGcd = gcd(left.denominator, right.denominator);
  const leftMultiplier = right.denominator / denominatorGcd;
  const rightMultiplier = left.denominator / denominatorGcd;

  return normalize(
    left.numerator * leftMultiplier + right.numerator * rightMultiplier,
    left.denominator * leftMultiplier
  );
};

const negate = (value) => ({
  numerator: -value.numerator,
  denominator: value.denominator,
});

const subtract = (left, right) => add(left, negate(right));

const multiply = (left, right) => {
  const leftCancellation = gcd(left.numerator, right.denominator);
  const rightCancellation = gcd(right.numerator, left.denominator);

  return normalize(
    (left.numerator / leftCancellation) * (right.numerator / rightCancellation),
    (left.denominator / rightCancellation) * (right.denominator / leftCancellation)
  );
};

const divide = (left, right) => {
  if (right.numerator === 0n) throw new ArithmeticError('division-zero');

  return multiply(left, normalize(right.denominator, right.numerator));
};

const remainder = (left, right) => {
  if (right.numerator === 0n) throw new ArithmeticError('modulo-zero');

  const quotientNumerator = left.numerator * right.denominator;
  const quotientDenominator = left.denominator * right.numerator;
  const truncatedQuotient = quotientNumerator / quotientDenominator;
  return subtract(left, multiply(normalize(truncatedQuotient), right));
};

const power = (base, exponent) => {
  if (exponent.denominator !== 1n) throw new ArithmeticError('fractional-exponent');

  const exponentValue = exponent.numerator;
  const absoluteExponent = exponentValue < 0n ? -exponentValue : exponentValue;
  if (absoluteExponent > MAX_EXPONENT) throw new ArithmeticError('exponent-too-large');
  if (base.numerator === 0n && exponentValue < 0n) {
    throw new ArithmeticError('division-zero');
  }

  if (
    absoluteExponent > 1n &&
    (BigInt(digitCount(base.numerator)) * absoluteExponent >
      BigInt(MAX_RESULT_DIGITS + 1) ||
      BigInt(digitCount(base.denominator)) * absoluteExponent >
        BigInt(MAX_RESULT_DIGITS + 1))
  ) {
    throw new ArithmeticError('result-too-large');
  }

  const positiveExponent = exponentValue < 0n ? -exponentValue : exponentValue;
  const numerator = base.numerator ** positiveExponent;
  const denominator = base.denominator ** positiveExponent;

  return exponentValue < 0n
    ? normalize(denominator, numerator)
    : normalize(numerator, denominator);
};

const tokenize = (expression) => {
  const tokens = [];
  let index = 0;

  while (index < expression.length) {
    const character = expression[index];

    if (/\s/.test(character)) {
      index += 1;
      continue;
    }

    if (OPERATOR_CHARACTERS.has(character)) {
      tokens.push({ type: character, value: character });
      index += 1;
    } else if (/\d|\./.test(character)) {
      const start = index;
      let dotCount = 0;

      while (index < expression.length && /\d|\./.test(expression[index])) {
        if (expression[index] === '.') dotCount += 1;
        index += 1;
      }

      const literal = expression.slice(start, index);
      if (dotCount > 1 || !/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(literal)) return null;
      tokens.push({ type: 'number', value: literal });
    } else {
      return null;
    }

    if (tokens.length > MAX_TOKENS) return null;
  }

  return tokens;
};

class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.index = 0;
    this.operations = 0;
    this.nestingDepth = 0;
  }

  current() {
    return this.tokens[this.index] || null;
  }

  consume(type) {
    if (this.current()?.type !== type) return null;
    const token = this.current();
    this.index += 1;
    return token;
  }

  countOperation() {
    this.operations += 1;
    if (this.operations > MAX_OPERATIONS) throw new ArithmeticError('too-many-operations');
  }

  parse() {
    if (this.tokens.length === 0) throw new ArithmeticError('empty');
    const value = this.parseAdditive();
    if (this.index !== this.tokens.length) throw new ArithmeticError('unexpected-token');
    return value;
  }

  parseAdditive() {
    let value = this.parseMultiplicative();

    while (this.current()?.type === '+' || this.current()?.type === '-') {
      const operator = this.current().type;
      this.index += 1;
      this.countOperation();
      const right = this.parseMultiplicative();
      value = operator === '+' ? add(value, right) : subtract(value, right);
    }

    return value;
  }

  parseMultiplicative() {
    let value = this.parseUnary();

    while (['*', '/', '%'].includes(this.current()?.type)) {
      const operator = this.current().type;
      this.index += 1;
      this.countOperation();
      const right = this.parseUnary();

      if (operator === '*') value = multiply(value, right);
      if (operator === '/') value = divide(value, right);
      if (operator === '%') value = remainder(value, right);
    }

    return value;
  }

  parseUnary() {
    if (this.current()?.type === '+' || this.current()?.type === '-') {
      const operator = this.current().type;
      this.index += 1;
      this.countOperation();
      const value = this.parseUnary();
      return operator === '-' ? negate(value) : value;
    }

    return this.parsePower();
  }

  parsePower() {
    const base = this.parsePrimary();
    if (!this.consume('^')) return base;

    this.countOperation();
    return power(base, this.parseUnary());
  }

  parsePrimary() {
    const number = this.consume('number');
    if (number) return parseLiteral(number.value);

    if (this.consume('(')) {
      this.nestingDepth += 1;
      if (this.nestingDepth > MAX_NESTING_DEPTH) {
        throw new ArithmeticError('nesting-too-deep');
      }

      const value = this.parseAdditive();
      if (!this.consume(')')) throw new ArithmeticError('missing-parenthesis');
      this.nestingDepth -= 1;
      return value;
    }

    throw new ArithmeticError('expected-number');
  }
}

const formatValue = ({ numerator, denominator }) => {
  if (denominator === 1n) return numerator.toString();

  let remainingDenominator = denominator;
  let twos = 0;
  let fives = 0;
  while (remainingDenominator % 2n === 0n) {
    remainingDenominator /= 2n;
    twos += 1;
  }
  while (remainingDenominator % 5n === 0n) {
    remainingDenominator /= 5n;
    fives += 1;
  }

  if (remainingDenominator !== 1n) {
    return `${numerator}/${denominator}`;
  }

  const scale = Math.max(twos, fives);
  const scaledNumerator =
    numerator * 2n ** BigInt(scale - twos) * 5n ** BigInt(scale - fives);
  const negative = scaledNumerator < 0n;
  const digits = (negative ? -scaledNumerator : scaledNumerator)
    .toString()
    .padStart(scale + 1, '0');
  const whole = scale === 0 ? digits : digits.slice(0, -scale);
  const fraction = scale === 0 ? '' : digits.slice(-scale).replace(/0+$/, '');
  return `${negative ? '-' : ''}${whole}${fraction ? `.${fraction}` : ''}`;
};

const normalizeExpression = (message) => {
  if (typeof message !== 'string') return null;

  let expression = message.trim();
  if (expression.length === 0 || expression.length > MAX_EXPRESSION_LENGTH) return null;

  expression = expression.replace(PREFIX_PATTERN, '').trim();
  expression = expression.replace(/\?\s*$/, '').trim();
  if (expression.length === 0 || expression.length > MAX_EXPRESSION_LENGTH) return null;

  return expression.replaceAll('×', '*').replaceAll('÷', '/');
};

export const createArithmeticReply = (message) => {
  const expression = normalizeExpression(message);
  if (!expression) return null;

  const tokens = tokenize(expression);
  if (!tokens) return null;

  try {
    return formatValue(new Parser(tokens).parse());
  } catch (error) {
    if (error instanceof ArithmeticError && error.code === 'division-zero') {
      return 'Division by zero is undefined.';
    }
    if (error instanceof ArithmeticError && error.code === 'modulo-zero') {
      return 'Modulo by zero is undefined.';
    }
    return null;
  }
};
