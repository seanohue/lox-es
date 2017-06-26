
class Token {
  constructor (type, lexeme = '', literal = {}, line) {
    this.type = type
    this.lexeme = lexeme
    this.literal = literal
    this.line = line
  }

  toString () {
    return `${this.type.toString()} ${this.lexeme} ${JSON.stringify(this.literal)}`
  }
}

module.exports = Token
