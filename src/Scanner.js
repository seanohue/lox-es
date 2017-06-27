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

  get currentChar () {
    return this.source.charAt(this.current)
  }

  get currentChunk () {
    return this.source.substring(this.start, this.current)
  }

  get trimmedChunk () {
    return this.source.substring(this.start + 1, this.current - 1)
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
        break

      // Literals
      case '"': return this.string()

      // Ignore whitespace.
      case ' ':
      case '\r':
      case '\t':
        break

      case '\n':
        this.line += 1
        break

      default:
        if (this.isDigit(char)) {
          // do stuff lol
        } else {
          this.CLI.error(this.line, 'Unexpected character')
        }
    }
  }

  isDigit (char) {
    return false
  }

  advance () {
    this.current += 1
    return this.source.charAt(this.current - 1)
  }

  match (expected = '') {
    if (this.isAtEnd) return false
    if (this.currentChar !== expected) return false

    this.current += 1

    return true
  }

  isSameLine () {
    return !['\n', '\0'].includes(this.peek())
  }

  string () {
    while (this.peek() !== '"' && !this.isAtEnd) {
      if (this.peek() === '\n') this.line += 1
      this.advance()
    }

    if (this.isAtEnd) {
      return this.CLI.error(this.line, 'Unterminated String')
    }

    this.advance() // Consume closing ".

    // Trim quotes
    const value = this.trimmedChunk
    return this.addToken(TT.STRING, value)
  }

  peek () {
    if (this.isAtEnd) return '\0'
    return this.currentChar
  }

  addToken (type, literal = null) {
    const text = this.currentChunk
    this.tokens.push(new Token(type, text, literal, this.line))
  }

  addEOF () {
    this.tokens.push(new Token(TT.EOF, '', null, this.line))
  }
}

module.exports = Scanner
