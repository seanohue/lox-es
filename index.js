#!/usr/bin/env node

const program = require('commander')
const CLI = require('./src/CLI')

program
  .version('0.0.0')
  .parse(process.argv)

if (program.args.length > 1) {
  console.error(`Usage: 'lox-es [scriptfile]'`)
} else if (program.args.length === 1) {
  CLI.runFile(program.args[0])
} else {
  CLI.runPrompt()
}
