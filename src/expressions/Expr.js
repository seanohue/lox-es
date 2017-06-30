
const Expr = require('./Expr')

class Unary extends Expr {
  constructor(operator, right) {
      		this.operator = operator
		this.right = right
    }
}

module.exports = Unary
