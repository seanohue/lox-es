const TokenType = Object.freeze({
  // Single-character tokens
  LEFT_PAREN: Symbol('('),
  RIGHT_PAREN: Symbol(')'),
  LEFT_BRACE: Symbol('{'),
  RIGHT_BRACE: Symbol('}'),
  COMMA: Symbol(','),
  DOT: Symbol('.'),
  STAR: Symbol('*'),
  MINUS: Symbol('-'),
  PLUS: Symbol('+'),
  SEMICOLON: Symbol(';'),
  SLASH: Symbol('/'),

  // One-or-two-character tokens
  BANG: Symbol('!'),
  BANG_EQUAL: Symbol('!='),
  EQUAL: Symbol('='),
  EQUAL_EQUAL: Symbol('=='),
  GREATER: Symbol('>'),
  LESSER: Symbol('<'),
  GREATER_EQUAL: Symbol('>='),
  LESSER_EQUAL: Symbol('<='),

  // Literals
  IDENTIFIER: Symbol('Identifier'),
  STRING: Symbol('String'),
  NUMBER: Symbol('Number'),

  // Keywords
  CLASS: Symbol('class'),
  ELSE: Symbol('else'),
  FALSE: Symbol('false'),
  TRUE: Symbol('true'),
  FUN: Symbol('fun'),
  FOR: Symbol('for'),
  WHILE: Symbol('while'),
  IF: Symbol('if'),
  NIL: Symbol('nil'),
  AND: Symbol('and'),
  OR: Symbol('or'),
  PRINT: Symbol('print'),
  RETURN: Symbol('return'),
  SUPER: Symbol('super'),
  THIS: Symbol('this'),
  VAR: Symbol('var'),

  EOF: Symbol('EOF')
})

module.exports = TokenType
