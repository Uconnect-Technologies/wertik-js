import logSymbols from 'log-symbols'
import chalk from 'chalk'
const log = console.log

export const successMessage = function (message, secondMessage?: string) {
  log(
    logSymbols.success,
    ' [Wertik-js]: ',
    chalk.green(message),
    secondMessage ? chalk.blue.underline.bold(secondMessage) : ''
  )
}

export const errorMessage = function (message) {
  log(logSymbols.error, ' [Wertik-js]:', chalk.red(message))
}

export const warningMessage = function () {}

export const infoMessage = function () {}
