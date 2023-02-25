import logSymbols from "log-symbols"
import chalk from "chalk"
import { wLog  } from "../utils/log"

export const successMessage = function (message, secondMessage?: string) {
  wLog(
    logSymbols.success,
    ` [Wertik-js]: `,
    chalk.green(message),
    secondMessage ? chalk.blue.underline.bold(secondMessage) : ""
  )
}

export const errorMessage = function (message) {
  wLog(logSymbols.error, ` [Wertik-js]:`, chalk.red(message))
}

export const warningMessage = function () {}

export const infoMessage = function () {}
