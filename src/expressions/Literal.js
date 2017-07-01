const Expr = require('./Expr')

class Literal extends Expr {
  constructor(value) {
      this.value = value
    }
}

module.exports = Literal
