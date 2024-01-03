import dayjs from "../utils/dayjs"
import chalk from "chalk"

export const wLog = console.log
export const wLogWithDateWithInfo = (info, ...params) => {
  let day = dayjs()
  console.log(
    day.format("L-LT"),
    day.format("Z"),
    chalk.blueBright(info),
    ...params
  )
}

export const wLogWithInfo = (info, ...params) => {
  console.log(chalk.blueBright(info), ...params)
}

export const wLogWithError = (info, ...params) => {
  console.log(chalk.redBright(info), ...params)
}

export const wLogWithSuccess = (info, ...params) => {
  console.log(chalk.greenBright(info), ...params)
}
