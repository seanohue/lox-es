const TT = require('./types/TokenType')
const Token = require('./Token')

class Scanner {
  constructor (source = '') {
    this.source = source
    this.tokens = []
    this.line = 1
    this.current = 0
    this.start = 0
    this.CLI = require('./CLI')
  }

  get isAtEnd () {
    return this.current >= this.source.length
  }

  scanTokens () {
    while (!this.isAtEnd) {
      this.start = this.current
      this.scanToken()
    }
    this.addEOF()
    return this.tokens
  }

  scanToken () {
    const char = this.advance()
    switch (char) {
      case '(': return this.addToken(TT.LEFT_PAREN)
      case ')': return this.addToken(TT.RIGHT_PAREN)
      case '{': return this.addToken(TT.LEFT_BRACE)
      case '}': return this.addToken(TT.RIGHT_BRACE)
      case ',': return this.addToken(TT.COMMA)
      case '.': return this.addToken(TT.DOT)
      case '-': return this.addToken(TT.MINUS)
      case '+': return this.addToken(TT.PLUS)
      case ';': return this.addToken(TT.SEMICOLON)
      case '*': return this.addToken(TT.STAR)
      case '!': return this.addToken(
        this.match('=')
          ? TT.BANG_EQUAL
          : TT.BANG
      )
      case '=': return this.addToken(
        this.match('=')
          ? TT.EQUAL_EQUAL
          : TT.EQUAL
      )
      case '>': return this.addToken(
        this.match('=')
          ? TT.GREATER_EQUAL
          : TT.GREATER
      )
      case '<': return this.addToken(
        this.match('=')
          ? TT.LESSER_EQUAL
          : TT.LESSER
      )
      case '/':
        if (this.match('/')) {
          // Comments go until EOL
          while (this.isSameLine()) this.advance()
        } else {
          this.addToken(TT.SLASH)
        }
        return
      default:
        this.CLI.error(this.line, 'Unexpected character')
    }
  }

  advance () {
    this.current += 1
    return this.source.charAt(this.current - 1)
  }

  match (expected = '') {
    if (this.isAtEnd) return false
    if (this.source.charAt(this.current) !== expected) return false

    this.current += 1

    return true
  }

  isSameLine () {
    return !['\n', '\0'].includes(this.peek())
  }

  peek () {
    if (this.isAtEnd) return '\0'
    return this.source.charAt(this.current)
  }

  addToken (type, literal = null) {
    const text = this.source.substring(this.start, this.current)
    this.tokens.push(new Token(type, text, literal, this.line))
  }

  addEOF () {
    this.tokens.push(new Token(TT.EOF, '', null, this.line))
  }
}

module.exports = Scanner
