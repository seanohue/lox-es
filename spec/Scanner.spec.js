const { expect } = require('chai')

const Scanner = require('../src/Scanner')
const TT = require('../src/types/TokenType')

describe('Lexical Scanner', () => {
  it('should be able to scan a single line and parse it', () => {
    const scanner = new Scanner('var hello = "world"')

    expect(scanner.scanTokens()).to.deep.equal([
      {
        type: TT.VAR,
        lexeme: 'var',
        literal: null,
        line: 1
      }, {
        type: TT.IDENTIFIER,
        lexeme: 'hello',
        literal: null,
        line: 1
      }, {
        type: TT.EQUAL,
        lexeme: '=',
        literal: null,
        line: 1
      }, {
        type: TT.STRING,
        lexeme: '"world"',
        literal: 'world',
        line: 1
      }, {
        type: TT.EOF,
        lexeme: '',
        literal: null,
        line: 1
      }])
  })
})
