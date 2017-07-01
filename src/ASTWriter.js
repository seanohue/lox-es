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
    ASTWriter.writeExprClass(baseClassPath, baseName)

    for (const typeDef of types) {
      const parsedTypeDef = ASTWriter.parseTypeDef(typeDef)
      const subClassPath = `${outputDir}/${parsedTypeDef.className}.js`
      ASTWriter.writeExprClass(subClassPath, baseName, parsedTypeDef)
    }
  }

  static writeExprClass (path, baseName, typeDef = {}) {
    const isBase = Object.keys(typeDef).length > 0
    const { className = baseName, argList } = typeDef
    console.log(`Writing to [${path}]`)
    fs.writeFileSync(path,
// Template for code generation:
`${isBase ? 'const Expr = require(\'./Expr\')\n' : '// Empty base class for expressions.'}
class ${isBase ? `${className} extends ${baseName}` : baseName} {
  ${isBase
    ? `constructor(${argList}) {
${'\n'.concat(argList)
    .split(', ')
    .map(arg => `${' '.repeat(6)}this.${arg.trim()} = ${arg.trim()}`)
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
