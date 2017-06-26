const program = require('commander')

program
  .version('0.0.0')
  .parse(process.argv)

class LoxCLI {
  static runFile(file) {
    console.log(file)
  }
  static runPrompt() {
    console.log('prompt!')
  }
}

if (program.args.length > 1) {
  console.error(`Usage: 'lox-es [scriptfile]'`)
} else if (program.args.length === 1) {
  LoxCLI.runFile(program.args[0])
} else {
  LoxCLI.runPrompt()
}
