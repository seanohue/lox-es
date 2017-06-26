const fs = require('fs')
const readline = require('readline')

const Scanner = require('./Scanner')

class CLI {
  static runFile (file) {
    const source = fs.readFileSync(file, { encoding: 'UTF-8' })
    CLI.run(source)
  }

  static runPrompt () {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    CLI.prompt(rl)
  }

  static prompt(rl) {
    rl.question(' > ', input =>  {
      CLI.run(input)
      CLI.prompt(rl)
    })
  }

  static run (source = '') {
    const scanner = new Scanner(source)
  }
}

module.exports = CLI
