import logSymbols from 'log-symbols'
import chalk from 'chalk'
const log = console.log

export const successMessage = function (message, secondMessage?: string): void {
  log(
    logSymbols.success,
    ' [Wertik-js]: ',
    chalk.green(message),
    chalk.blue.underline.bold(secondMessage)
  )
}

export const errorMessage = function (message): void {
  log(logSymbols.error, ' [Wertik-js]:', chalk.red(message))
}
