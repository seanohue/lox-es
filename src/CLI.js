const fs = require('fs')
const readline = require('readline')

const Scanner = require('./Scanner')

class CLI {
  static runFile (file) {
    const source = fs.readFileSync(file, { encoding: 'UTF-8' })
    CLI.run(source)
    if (CLI.hadError) process.exit(65)
  }

  static runPrompt () {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    CLI.prompt(rl)
  }

  static prompt (rl) {
    rl.question(' > ', input => {
      CLI.run(input)
      CLI.hadError = false
      CLI.prompt(rl)
    })
  }

  static run (source = '') {
    console.log(`Source: ${source}`)
    const scanner = new Scanner(source)
    const tokens = scanner.scanTokens()

    for (const token of tokens) {
      console.log(token)
    }
  }

  static error (line, message) {
    CLI.report(line, '', message)
  }

  static report (line = 'unknown', where = '', message = '') {
    console.error(`[line ${line}]: Error ${where}: ${message}`)
    CLI.hadError = true
  }
}

CLI.hadError = false

module.exports = CLI
