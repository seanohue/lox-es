class Scanner {
  constructor (source = '') {
    this.source = source
  }

  scanTokens () {
    return [this.source]
  }
}

module.exports = Scanner
