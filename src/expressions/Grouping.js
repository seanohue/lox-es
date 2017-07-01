const Expr = require('./Expr')

class Grouping extends Expr {
  constructor(expression) {
      this.expression = expression
    }
}

module.exports = Grouping
