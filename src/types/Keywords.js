const TT = require('./TokenTypes')

module.exports = (new Map(Object.entries({
  and: TT.AND,
  or: TT.OR,

  class: TT.CLASS,
  super: TT.SUPER,
  this: TT.THIS,

  fun: TT.FUN,
  var: TT.VAR,

  true: TT.TRUE,
  false: TT.FALSE,

  if: TT.IF,
  else: TT.ELSE,

  for: TT.FOR,
  while: TT.WHILE,

  nil: TT.NIL,

  print: TT.PRINT,
  return: TT.RETURN
})))
