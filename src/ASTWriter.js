const fs = require('fs')

class ASTWriter {
  static generateAST () {
    const expressionsDir = `${__dirname}/expressions`
    ASTWriter.defineAST(expressionsDir, 'Expr', [
      'Binary   : left, operator, right',
      'Grouping : expression',
      'Literal  : value',
      'Unary    : operator, right'
    ])
    console.log(`AST generated in [${expressionsDir}].`)
  }

  static defineAST (outputDir, baseName, types = []) {
    const baseClassPath = `${outputDir}/${baseName}.js`
    ASTWriter.writeExprClass(path, baseName)

    for (const typeDef of types) {
      const parsedTypeDef = ASTWriter.parseTypeDef(typeDef)
      const subClassPath = `${outputDir}/${parsedTypeDef.className}}`
      ASTWriter.writeExprClass(path, baseName, parsedTypeDef)
    }
  }

  static writeExprClass (path, baseName, typeDef = {}) {
    const { className = baseName, argList } = typeDef
    fs.writeFileSync(path,
// Template for code generation:
`
${typeDef ? 'const Expr = require(\'./Expr\')' : ''}

class ${typeDef ? `${className} extends ${baseName}` : baseName} {
  ${typeDef
    ? `constructor(${argList}) {
      ${['\n']
          .concat(argList)
          .split(', ')
          .map(arg => `${' '.repeat(6)}this.${arg} = ${arg}`)
          .join('\n')}
    }`
    : ''
  }
}

module.exports = ${className}
`)
// End template for code generation.
  }

  static parseTypeDef (typeDef) {
    console.log(typeDef)
    const [className, argList] = typeDef
      .split(':')
      .map(part => part.trim())
    return { className, argList }
  }
}

module.exports = ASTWriter
